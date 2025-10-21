import { Injectable } from '@nestjs/common';
import { and, eq, inArray, isNull, sql } from 'drizzle-orm';
import { Role } from 'src/shared-modules/auth/permission-system';
import { MemberAssociation, User } from 'src/shared-modules/core';
import { db, memberAssociationsTable, userTable } from '../drizzle-setup';

@Injectable()
export class UserRepository {
  async getUsersByEmail(emails: string[]): Promise<User[]> {
    const users = await db.query.userTable.findMany({
      where: inArray(userTable.email, emails),
    });

    return users.map((user) =>
      User.create(
        {
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          activatedAt: user.activatedAt ?? undefined,
          deletedAt: user.deletedAt ?? undefined,
        },
        user.id,
      ),
    );
  }
  async getUserById(id: string): Promise<User | undefined> {
    const userResult = await db.query.userTable.findFirst({
      where: and(eq(userTable.id, id), isNull(userTable.deletedAt)),
      with: {
        memberAssociations: true,
      },
    });

    if (!userResult) return undefined;

    return User.create(
      {
        name: userResult.name,
        email: userResult.email,
        createdAt: userResult.createdAt,
        activatedAt: userResult.activatedAt ?? undefined,
        deletedAt: userResult.deletedAt ?? undefined,
        memberAssociations: userResult.memberAssociations.map((member) =>
          MemberAssociation.create(
            {
              churchId: member.churchId,
              userId: member.userId,
              owner: member.owner,
              roles: member.roles as Role[],
              status: member.status,
              createdAt: member.createdAt,
            },
            member.id,
          ),
        ),
      },
      userResult.id,
    );
  }

  async updateUser(user: User) {
    await db.transaction(async (tx) => {
      await tx
        .update(userTable)
        .set({
          name: user.name,
          email: user.email,
        })
        .where(eq(userTable.id, user.id))
        .execute();

      await tx
        .insert(memberAssociationsTable)
        .values(
          user.memberAssociations?.map((member) => ({
            churchId: member.churchId,
            userId: member.userId,
            owner: member.owner,
            roles: member.roles,
            status: member.status,
            createdAt: new Date(),
          })) ?? [],
        )
        .onConflictDoUpdate({
          target: [
            memberAssociationsTable.churchId,
            memberAssociationsTable.userId,
          ],
          set: {
            owner: sql`excluded.owner`,
            roles: sql`excluded.roles`,
            status: sql`excluded.status`,
          },
        });
    });
  }

  // Hook usage
  async systemCreateUser(user: User) {
    await db
      .insert(userTable)
      .values({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        activatedAt: user.activatedAt,
      })
      .onConflictDoUpdate({
        target: userTable.email,
        set: {
          id: user.id,
          name: user.name,
          email: user.email,
          activatedAt: user.activatedAt,
        },
      })
      .execute();
  }

  async systemUpdateUser(user: User) {
    await db
      .update(userTable)
      .set({
        name: user.name,
        email: user.email,
      })
      .where(eq(userTable.id, user.id))
      .execute();
  }

  async deleteUser(id: string) {
    await db
      .update(userTable)
      .set({ deletedAt: new Date() })
      .where(eq(userTable.id, id))
      .execute();
  }
}
