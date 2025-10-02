import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Church, SubscriptionStatus } from 'src/shared-modules/core';
import { churchTable, db } from '../drizzle-setup';

@Injectable()
export class OrganizationsRepository {
  // Método para encontrar uma organização pelo ID do Clerk
  async findById(clerkOrgId: string) {
    return await db
      .select()
      .from(churchTable)
      .where(eq(churchTable.id, clerkOrgId))
      .limit(1)
      .execute();
  }

  // Método para criar uma nova organização
  async create(church: Church) {
    return await db
      .insert(churchTable)
      .values({
        id: church.id,
        businessName: church.businessName,
        publicName: church.publicName,
        cnpj: church.cnpj,
        modulePermissions: church.modulePermissions,
        stripeCustomerId: church.stripeCustomerId,
        subscriptionStatus: church.subscriptionStatus,
        createdAt: church.createdAt,
      })
      .returning()
      .execute();
  }

  // Método para atualizar o status de assinatura
  async updateSubscriptionStatus(churchId: string, status: SubscriptionStatus) {
    return await db
      .update(churchTable)
      .set({ subscriptionStatus: status })
      .where(eq(churchTable.id, churchId))
      .returning()
      .execute();
  }
}
