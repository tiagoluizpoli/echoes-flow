import { Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { User } from 'src/shared-modules/core';
import { db, userTable } from '../drizzle-setup';

@Injectable()
export class UserRepository {
  async getUserById(id: string): Promise<User | undefined> {
    const userResult = await db.query.usersTable.findFirst({
      where: and(eq(userTable.id, id), isNull(userTable.deletedAt)),
    });

    if (!userResult) return undefined;

    return User.create(
      {
        name: userResult.name,
        email: userResult.email,
        createdAt: userResult.createdAt,
      },
      userResult.id,
    );
  }

  async createUser(user: User) {
    await db
      .insert(userTable)
      .values({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      })
      .execute();
  }

  async updateUser(user: User) {
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
