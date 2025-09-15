import { SetMetadata } from '@nestjs/common';

export const SUBSCRIPTION_STATUS_KEY = 'subscription_status';
export const SubscriptionStatus = (...statuses: string[]) =>
  SetMetadata(SUBSCRIPTION_STATUS_KEY, statuses);
