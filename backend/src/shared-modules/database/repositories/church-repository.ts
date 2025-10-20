import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Church, SubscriptionStatus } from 'src/shared-modules/core';
import { churchTable, db } from '../drizzle-setup';

@Injectable()
export class ChurchRepository {
  // Método para encontrar uma organização pelo ID do Clerk
  async findById(clerkOrgId: string) {
    const church = await db.query.churchTable.findFirst({
      where: eq(churchTable.id, clerkOrgId),
      with: {
        churchContactInfo: true,
        churchAddress: true,
      },
    });

    if (!church) return undefined;

    return Church.create({
      businessName: church.businessName,
      slug: church.slug,
      publicName: church.publicName,
      cnpj: church.cnpj,
      description: church.description ?? undefined,
      modulePermissions: church.modulePermissions ?? undefined,
      subscriptionStatus: church.subscriptionStatus,
      paymentGatewayCustomerId: church.paymentGatewayCustomerId ?? undefined,
      createdAt: church.createdAt ?? undefined,
      contactInfo: church.churchContactInfo.map((contact) => ({
        type: contact.type,
        maskRegex: contact.maskRegex ?? undefined,
        value: contact.value,
      })),
      address: {
        street: church.churchAddress.street,
        number: church.churchAddress.number,
        complement: church.churchAddress.complement ?? undefined,
        neighborhood: church.churchAddress.neighborhood,
        state: church.churchAddress.state,
        city: church.churchAddress.city,
        zipCode: church.churchAddress.zipCode,
      },
    });
  }

  // Método para criar uma nova organização
  async create(church: Church) {
    await db
      .insert(churchTable)
      .values({
        id: church.id,
        paymentGatewayCustomerId: church.paymentGatewayCustomerId,
        slug: church.slug,
        businessName: church.businessName,
        publicName: church.publicName,
        cnpj: church.cnpj,
        description: church.description,
        modulePermissions: church.modulePermissions,
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
