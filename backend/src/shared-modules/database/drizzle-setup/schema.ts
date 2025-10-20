import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { memberStatuses } from 'src/shared-modules/core';
// --- Default sizes ---

// --- Enums ---
// Definindo os enums para garantir a integridade dos dados
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'pending',
  'active',
  'paused',
  'ended',
]);

export const memberStatusEnum = pgEnum('member_status', memberStatuses);

export const contactTypeEnum = pgEnum('contact_type', ['phone', 'email']);
// --- Tables ---

// Tabela de Igrejas
export const churchTable = pgTable(
  'church',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    businessName: varchar('name', { length: 255 }).unique().notNull(),
    publicName: varchar('public_name', { length: 255 }).unique().notNull(),
    cnpj: varchar('cnpj', { length: 255 }).unique().notNull(),
    description: varchar('description', { length: 255 }),
    modulePermissions: jsonb('module_permissions')
      .$type<string[]>()
      .default([]),
    subscriptionStatus: subscriptionStatusEnum('subscription_status')
      .notNull()
      .default('pending'),
    paymentGatewayCustomerId: varchar('payment_gateway_customer_id', {
      length: 255,
    }).unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('churchTable__subscription_status_idx').on(t.subscriptionStatus),
    index('churchTable__payment_gateway_customer_id_idx').on(
      t.paymentGatewayCustomerId,
    ),
    index('churchTable__created_at_idx').on(t.createdAt),
  ],
);

export const churchContactInfoTable = pgTable(
  'church_contact_info',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    churchId: uuid('church_id')
      .notNull()
      .references(() => churchTable.id, { onDelete: 'cascade' }),
    type: contactTypeEnum('type').notNull(),
    maskRegex: varchar('mask_regex', { length: 255 }).notNull(),
    value: varchar('value', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastUpdatedAt: timestamp('last_updated_at'),
  },
  (t) => [
    index('churchContactInfoTable__church_id_idx').on(t.churchId),
    index('churchContactInfoTable__type_idx').on(t.type),
    index('churchContactInfoTable__value_idx').on(t.value),
  ],
);

export const churchAddressTable = pgTable(
  'church_address',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    churchId: uuid('church_id')
      .notNull()
      .unique()
      .references(() => churchTable.id, { onDelete: 'cascade' }),
    street: varchar('street', { length: 255 }).notNull(),
    number: varchar('number', { length: 255 }).notNull(),
    complement: varchar('complement', { length: 255 }),
    neighborhood: varchar('neighborhood', { length: 255 }).notNull(),
    state: varchar('state', { length: 2 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    zipCode: varchar('zip_code', { length: 8 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastUpdatedAt: timestamp('last_updated_at'),
  },
  (t) => [
    index('churchAddressTable__church_id_idx').on(t.churchId),
    index('churchAddressTable__street_idx').on(t.street),
    index('churchAddressTable__number_idx').on(t.number),
    index('churchAddressTable__neighborhood_idx').on(t.neighborhood),
    index('churchAddressTable__state_idx').on(t.state),
    index('churchAddressTable__city_idx').on(t.city),
    index('churchAddressTable__zip_code_idx').on(t.zipCode),
  ],
);

// Tabela de Usuários (cópia local dos dados do Clerk)
export const userTable = pgTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    activatedAt: timestamp('activated_at'),
    deletedAt: timestamp('deleted_at'),
  },
  (t) => [
    index('usersTable__email_idx').on(t.email),
    index('usersTable__created_at_idx').on(t.createdAt),
    index('usersTable__deleted_at_idx').on(t.deletedAt),
    unique('usersTable__email_deletedAt_unique').on(t.email, t.deletedAt),
  ],
);

// Tabela de Associações de Membros
export const memberAssociationsTable = pgTable(
  'member_associations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    churchId: uuid('church_id')
      .notNull()
      .references(() => churchTable.id, { onDelete: 'cascade' }),
    owner: boolean('owner').notNull().default(false),
    roles: jsonb('roles').$type<string[]>().notNull(),
    status: memberStatusEnum('status').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    // Índices para otimizar buscas por usuário ou organização
    index('memberAssociationsTable__user_id_idx').on(t.userId),
    index('memberAssociationsTable__church_id_idx').on(t.churchId),
    index('memberAssociationsTable__status_idx').on(t.status),
    // Garante que cada usuário tenha apenas uma associação por organização
    unique('memberAssociationsTable__unique_user_org').on(t.userId, t.churchId),
  ],
);

// --- Relations ---

// Definições de relacionamentos para otimizar as queries com o Drizzle
export const memberAssociationsRelations = relations(
  memberAssociationsTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [memberAssociationsTable.userId],
      references: [userTable.id],
    }),
    church: one(churchTable, {
      fields: [memberAssociationsTable.churchId],
      references: [churchTable.id],
    }),
  }),
);

export const churchContactInfoRelations = relations(
  churchContactInfoTable,
  ({ one }) => ({
    church: one(churchTable, {
      fields: [churchContactInfoTable.churchId],
      references: [churchTable.id],
    }),
  }),
);

export const usersRelations = relations(userTable, ({ many }) => ({
  memberAssociations: many(memberAssociationsTable),
}));

export const churchRelations = relations(churchTable, ({ many, one }) => ({
  memberAssociations: many(memberAssociationsTable),
  churchContactInfo: many(churchContactInfoTable),
  churchAddress: one(churchAddressTable, {
    fields: [churchTable.id],
    references: [churchAddressTable.churchId],
  }),
}));

export const churchAddressRelations = relations(
  churchAddressTable,
  ({ one }) => ({
    church: one(churchTable, {
      fields: [churchAddressTable.churchId],
      references: [churchTable.id],
    }),
  }),
);
