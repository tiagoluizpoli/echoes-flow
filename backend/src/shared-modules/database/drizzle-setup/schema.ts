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

// Tabela de Igrejas
export const churchTable = pgTable(
  'church',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    businessName: varchar('name', { length: 255 }).unique().notNull(),
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
    index('churchTable__name_idx').on(t.businessName),
    index('churchTable__public_name_idx').on(t.publicName),
    index('churchTable__cnpj_idx').on(t.cnpj),
    index('churchTable__subscription_status_idx').on(t.subscriptionStatus),
    index('churchTable__stripe_customer_id_idx').on(t.stripeCustomerId),
    index('churchTable__created_at_idx').on(t.createdAt),
  ],
);

export const churchContactInfoTable = pgTable(
  'church_contact_info',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    chruchId: varchar('church_id', { length: 255 }).references(
      () => churchTable.id,
      { onDelete: 'cascade' },
    ),
    type: contactTypeEnum('type').notNull(),
    maskRegex: varchar('mask_regex', { length: 255 }).notNull(),
    value: varchar('value', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastUpdatedAt: timestamp('last_updated_at').notNull(),
  },
  (t) => [
    index('churchContactInfoTable__church_id_idx').on(t.chruchId),
    index('churchContactInfoTable__type_idx').on(t.type),
    index('churchContactInfoTable__value_idx').on(t.value),
  ],
);

// Tabela de Usuários (cópia local dos dados do Clerk)
export const userTable = pgTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    churchId: varchar('church_id', { length: 255 }).references(
      () => churchTable.id,
      { onDelete: 'cascade' },
    ),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  (t) => [
    index('usersTable__church_id_idx').on(t.churchId),
    index('usersTable__email_idx').on(t.email),
    index('usersTable__created_at_idx').on(t.createdAt),
    index('usersTable__deleted_at_idx').on(t.deletedAt),
  ],
);

export const pastorAssociationsTable = pgTable(
  'pastor_associations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    churchId: varchar('church_id', { length: 255 })
      .notNull()
      .references(() => churchTable.id, { onDelete: 'cascade' }),
    main: boolean('main').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('pastorAssociationsTable__user_id_idx').on(t.userId),
    index('pastorAssociationsTable__church_id_idx').on(t.churchId),
    unique('pastorAssociationsTable__unique_user_church').on(
      t.userId,
      t.churchId,
    ),
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
    churchId: varchar('church_id', { length: 255 })
      .notNull()
      .references(() => churchTable.id, { onDelete: 'cascade' }),
    role: memberRoleEnum('role').notNull(),
    status: memberStatusEnum('status').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    // Índices para otimizar buscas por usuário ou organização
    index('memberAssociationsTable__user_id_idx').on(t.userId),
    index('memberAssociationsTable__church_id_idx').on(t.churchId),
    index('memberAssociationsTable__role_idx').on(t.role),
    index('memberAssociationsTable__status_idx').on(t.status),
    // Garante que cada usuário tenha apenas uma associação por organização
    unique('memberAssociationsTable__unique_user_org').on(t.userId, t.churchId),
  ],
);

export const churchAddressTable = pgTable(
  'church_address',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    churchId: varchar('church_id', { length: 255 }).references(
      () => churchTable.id,
      { onDelete: 'cascade' },
    ),
    street: varchar('street', { length: 255 }).notNull(),
    number: varchar('number', { length: 255 }).notNull(),
    complement: varchar('complement', { length: 255 }),
    neighborhood: varchar('neighborhood', { length: 255 }).notNull(),
    state: varchar('state', { length: 2 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    zipCode: varchar('zip_code', { length: 8 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastUpdatedAt: timestamp('last_updated_at').notNull(),
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
      fields: [churchContactInfoTable.chruchId],
      references: [churchTable.id],
    }),
  }),
);

export const usersRelations = relations(userTable, ({ one, many }) => ({
  church: one(churchTable, {
    fields: [userTable.churchId],
    references: [churchTable.id],
  }),
  memberAssociations: many(memberAssociationsTable),
  pastorAssociations: many(pastorAssociationsTable),
}));

export const pastorAssociationsRelations = relations(
  pastorAssociationsTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [pastorAssociationsTable.userId],
      references: [userTable.id],
    }),
    church: one(churchTable, {
      fields: [pastorAssociationsTable.churchId],
      references: [churchTable.id],
    }),
  }),
);

export const churchRelations = relations(churchTable, ({ many }) => ({
  memberAssociations: many(memberAssociationsTable),
  users: many(userTable),
  pastorAssociations: many(pastorAssociationsTable),
  churchContactInfo: many(churchContactInfoTable),
  churchAddress: many(churchAddressTable),
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
