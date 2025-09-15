import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { MemberAssociation, User } from 'src/shared-modules/core';
import { db, memberAssociationsTable } from '../drizzle-setup';

@Injectable()
export class MemberAssociationsRepository {
  async findByUserIdAndOrgId(
    uId: string,
    orgId: string,
  ): Promise<MemberAssociation | undefined> {
    const memberAssociationsResult =
      await db.query.memberAssociationsTable.findFirst({
        with: {
          user: true,
        },
        where: and(
          eq(memberAssociationsTable.userId, uId),
          eq(memberAssociationsTable.organizationId, orgId),
        ),
      });

    if (!memberAssociationsResult) return undefined;

    const { id, userId, organizationId, role, status, createdAt, user } =
      memberAssociationsResult;

    return MemberAssociation.create(
      {
        userId,
        organizationId,
        role,
        status,
        createdAt,
        user: user
          ? User.create(
              {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                deletedAt: user.deletedAt ?? undefined,
              },
              user.id,
            )
          : undefined,
      },
      id,
    );
  }
}
