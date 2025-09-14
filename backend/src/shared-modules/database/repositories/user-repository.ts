import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { User } from 'src/shared-modules/core';
import { db, usersTable } from '../drizzle-setup';

@Injectable()
export class UserRepository {
  async getUserById(id: string): Promise<User | undefined> {
    const userResult = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
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
      .insert(usersTable)
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
      .update(usersTable)
      .set({
        name: user.name,
        email: user.email,
      })
      .where(eq(usersTable.id, user.id))
      .execute();
  }

  async deleteUser(id: string) {
    await db
      .update(usersTable)
      .set({ deletedAt: new Date() })
      .where(eq(usersTable.id, id))
      .execute();
  }
}
