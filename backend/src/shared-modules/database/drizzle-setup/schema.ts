import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
// --- Default sizes ---

// --- Enums ---
// Definindo os enums para garantir a integridade dos dados
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'pending',
  'active',
  'paused',
  'ended',
]);
export const memberRoleEnum = pgEnum('member_role', [
  'admin',
  'leader',
  'member',
]);
export const memberStatusEnum = pgEnum('member_status', ['pending', 'active']);

// --- Tables ---

// Tabela de Organizações
export const organizationsTable = pgTable('organizations', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  subscriptionStatus: subscriptionStatusEnum('subscription_status')
    .notNull()
    .default('pending'),
  modulePermissions: jsonb('module_permissions').$type<string[]>().default([]),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 })
    .unique()
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Tabela de Usuários (cópia local dos dados do Clerk)
export const usersTable = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Tabela de Associações de Membros
export const memberAssociationsTable = pgTable(
  'member_associations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    organizationId: varchar('organization_id', { length: 255 })
      .notNull()
      .references(() => organizationsTable.id, { onDelete: 'cascade' }),
    role: memberRoleEnum('role').notNull(),
    status: memberStatusEnum('status').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    // Índices para otimizar buscas por usuário ou organização
    userIdIndex: index('user_id_idx').on(t.userId),
    organizationIdIndex: index('organization_id_idx').on(t.organizationId),
    // Garante que cada usuário tenha apenas uma associação por organização
    uniqueUserOrg: unique('unique_user_org').on(t.userId, t.organizationId),
  }),
);

// Definições de relacionamentos para otimizar as queries com o Drizzle
export const memberAssociationsRelations = relations(
  memberAssociationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [memberAssociationsTable.userId],
      references: [usersTable.id],
    }),
    organization: one(organizationsTable, {
      fields: [memberAssociationsTable.organizationId],
      references: [organizationsTable.id],
    }),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  memberAssociations: many(memberAssociationsTable),
}));

export const organizationsRelations = relations(
  organizationsTable,
  ({ many }) => ({
    memberAssociations: many(memberAssociationsTable),
  }),
);
