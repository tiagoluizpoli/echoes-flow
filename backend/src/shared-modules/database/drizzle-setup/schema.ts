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

export const contactTypeEnum = pgEnum('contact_type', ['phone', 'email']);
// --- Tables ---

// Tabela de Organizações
export const organizationsTable = pgTable(
  'organizations',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    organizationName: varchar('name', { length: 255 }).unique().notNull(),
    publicName: varchar('public_name', { length: 255 }).unique().notNull(),
    cnpj: varchar('cnpj', { length: 255 }).unique().notNull(),
    subscriptionStatus: subscriptionStatusEnum('subscription_status')
      .notNull()
      .default('pending'),
    modulePermissions: jsonb('module_permissions')
      .$type<string[]>()
      .default([]),
    stripeCustomerId: varchar('stripe_customer_id', { length: 255 })
      .unique()
      .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('organizationsTable__name_idx').on(t.organizationName),
    index('organizationsTable__subscription_status_idx').on(
      t.subscriptionStatus,
    ),
    index('organizationsTable__stripe_customer_id_idx').on(t.stripeCustomerId),
    index('organizationsTable__created_at_idx').on(t.createdAt),
  ],
);

export const organizatgionContactInfoTable = pgTable(
  'organization_contact_info',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: varchar('organization_id', { length: 255 }),
    type: contactTypeEnum('type').notNull(),
    value: varchar('value', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastUpdatedAt: timestamp('last_updated_at').notNull(),
  },
);

// Tabela de Usuários (cópia local dos dados do Clerk)
export const usersTable = pgTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  (t) => [
    index('usersTable__email_idx').on(t.email),
    index('usersTable__created_at_idx').on(t.createdAt),
    index('usersTable__deleted_at_idx').on(t.deletedAt),
  ],
);

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
  (t) => [
    // Índices para otimizar buscas por usuário ou organização
    index('memberAssociationsTable__user_id_idx').on(t.userId),
    index('memberAssociationsTable__organization_id_idx').on(t.organizationId),
    // Garante que cada usuário tenha apenas uma associação por organização
    unique('memberAssociationsTable__unique_user_org').on(
      t.userId,
      t.organizationId,
    ),
  ],
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
