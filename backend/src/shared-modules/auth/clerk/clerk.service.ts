// src/auth/auth.service.ts

import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from 'src/shared-modules/database';
import { Webhook } from 'svix';
import { env, User } from '../../core';

// import type { DrizzleService } from '../database/drizzle.service';
// import { users } from '../database/schema';

export const webhookAcceptableEventNames = [
  'user.created',
  'user.updated',
  'user.deleted',
] as const;

export type WebhookEventName = (typeof webhookAcceptableEventNames)[number];

interface SyncUserParams {
  event: WebhookEvent;
}

const { CLERK_WEBHOOK_SECRET } = env;
@Injectable()
export class ClerkService {
  private webhookSecret: string;

  constructor(private readonly userRepository: UserRepository) {
    this.webhookSecret = CLERK_WEBHOOK_SECRET;
  }

  async verifyWebhook(
    body: Buffer,
    id: string,
    timestamp: string,
    signature: string,
  ) {
    const wh = new Webhook(this.webhookSecret);
    return wh.verify(body, {
      'svix-id': id,
      'svix-timestamp': timestamp,
      'svix-signature': signature,
    });
  }

  async syncUser({ event }: SyncUserParams) {
    if (!webhookAcceptableEventNames.includes(event.type as WebhookEventName))
      throw new UnprocessableEntityException('Invalid event type');
    console.log(event.type);
    if (event.type === 'user.created') {
      const existingUser = await this.userRepository.getUserById(event.data.id);

      if (existingUser)
        throw new UnprocessableEntityException('User already exists');

      const user = User.create(
        {
          name: `${event.data.first_name} ${event.data.last_name}`,
          email: event.data.email_addresses[0].email_address,
          createdAt: new Date(event.data.created_at),
        },
        event.data.id,
      );

      await this.userRepository.createUser(user);
    }

    if (event.type === 'user.updated') {
      const user = User.create(
        {
          name: `${event.data.first_name} ${event.data.last_name}`,
          email: event.data.email_addresses[0].email_address,
          createdAt: new Date(event.data.created_at),
        },
        event.data.id,
      );

      await this.userRepository.updateUser(user);
    }

    if (event.type === 'user.deleted') {
      if (!event.data.id) throw new UnprocessableEntityException('');
      await this.userRepository.deleteUser(event.data.id);
    }
  }
}
