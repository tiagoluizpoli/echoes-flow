import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Church, SubscriptionStatus } from 'src/shared-modules/core';
import {
  churchAddressTable,
  churchContactInfoTable,
  churchTable,
  db,
  memberAssociationsTable,
} from '../drizzle-setup';

@Injectable()
export class ChurchRepository {
  async findChurchsByUserId(userId: string) {
    const flattened = await db
      .select({
        churchId: churchTable.id,
        church: churchTable,
        church_contact_info: churchContactInfoTable,
        church_address: churchAddressTable,
      })
      .from(churchTable)
      .leftJoin(
        memberAssociationsTable,
        eq(churchTable.id, memberAssociationsTable.churchId),
      )
      // You need to join the related tables you want to 'with' as well
      .leftJoin(
        churchContactInfoTable,
        eq(churchTable.id, churchContactInfoTable.churchId),
      )
      .leftJoin(
        churchAddressTable,
        eq(churchTable.id, churchAddressTable.churchId),
      )
      .where(eq(memberAssociationsTable.userId, userId));

    type Result = (typeof flattened)[number];
    const churches = flattened.reduce(
      (acc: Church[], currentChurch: Result) => {
        const existingChurch = acc.find((c) => c.id === currentChurch.churchId);
        const { church, church_address, church_contact_info } = currentChurch;

        if (!existingChurch) {
          acc.push(
            Church.create(
              {
                businessName: church.businessName,
                slug: church.slug,
                publicName: church.publicName,
                cnpj: church.cnpj,
                description: church.description ?? undefined,
                modulePermissions: church.modulePermissions ?? undefined,
                subscriptionStatus: church.subscriptionStatus,
                paymentGatewayCustomerId:
                  church.paymentGatewayCustomerId ?? undefined,
                createdAt: church.createdAt ?? undefined,
                contactInfo: church_contact_info
                  ? [
                      {
                        type: church_contact_info.type,
                        maskRegex: church_contact_info.maskRegex ?? undefined,
                        value: church_contact_info.value,
                      },
                    ]
                  : [],
                address: church_address
                  ? {
                      street: church_address.street,
                      number: church_address.number,
                      complement: church_address.complement ?? undefined,
                      neighborhood: church_address.neighborhood,
                      state: church_address.state,
                      city: church_address.city,
                      zipCode: church_address.zipCode,
                    }
                  : undefined,
              },
              church.id,
            ),
          );

          return acc;
        }

        if (church_contact_info) {
          existingChurch.contactInfo?.push({
            type: church_contact_info.type,
            maskRegex: church_contact_info.maskRegex ?? undefined,
            value: church_contact_info.value,
          });
        }

        return acc;
      },
      [],
    );

    return churches;
  }

  async findById(clerkOrgId: string) {
    const church = await db.query.churchTable.findFirst({
      where: eq(churchTable.id, clerkOrgId),
      with: {
        churchContactInfo: true,
        churchAddress: true,
      },
    });

    if (!church) return undefined;
  }

  // Método para criar uma nova organização
  async create(church: Church) {
    await db.transaction(async (tx) => {
      await tx
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

      if (church.contactInfo) {
        await tx.insert(churchContactInfoTable).values(
          church.contactInfo.map((ci) => ({
            churchId: church.id,
            type: ci.type,
            value: ci.value,
            maskRegex: ci.maskRegex,
          })),
        );
      }

      if (church.address) {
        await tx.insert(churchAddressTable).values({
          churchId: church.id,
          street: church.address.street,
          number: church.address.number,
          complement: church.address.complement,
          neighborhood: church.address.neighborhood,
          state: church.address.state,
          city: church.address.city,
          zipCode: church.address.zipCode,
        });
      }
    });
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
