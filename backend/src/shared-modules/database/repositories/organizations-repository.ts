import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Organization, SubscriptionStatus } from 'src/shared-modules/core';
import { db, organizationsTable } from '../drizzle-setup';

@Injectable()
export class OrganizationsRepository {
  // Método para encontrar uma organização pelo ID do Clerk
  async findById(clerkOrgId: string) {
    return await db
      .select()
      .from(organizationsTable)
      .where(eq(organizationsTable.id, clerkOrgId))
      .limit(1)
      .execute();
  }

  // Método para criar uma nova organização
  async create(organization: Organization) {
    return await db
      .insert(organizationsTable)
      .values({
        id: organization.id,
        name: organization.name,
        modulePermissions: organization.modulePermissions,
        subscriptionStatus: organization.subscriptionStatus,
        stripeCustomerId: organization.stripeCustomerId,
        createdAt: organization.createdAt,
      })
      .returning()
      .execute();
  }

  // Método para atualizar o status de assinatura
  async updateSubscriptionStatus(
    clerkOrgId: string,
    status: SubscriptionStatus,
  ) {
    return await db
      .update(organizationsTable)
      .set({ subscriptionStatus: status })
      .where(eq(organizationsTable.id, clerkOrgId))
      .returning()
      .execute();
  }
}
