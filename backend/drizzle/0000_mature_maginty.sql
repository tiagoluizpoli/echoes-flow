CREATE TYPE "public"."contact_type" AS ENUM('phone', 'email');--> statement-breakpoint
CREATE TYPE "public"."member_role" AS ENUM('admin', 'leader', 'member');--> statement-breakpoint
CREATE TYPE "public"."member_status" AS ENUM('pending', 'active');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('pending', 'active', 'paused', 'ended');--> statement-breakpoint
CREATE TABLE "church_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"church_id" varchar(255),
	"street" varchar(255) NOT NULL,
	"number" varchar(255) NOT NULL,
	"complement" varchar(255),
	"neighborhood" varchar(255) NOT NULL,
	"state" varchar(2) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zip_code" varchar(8) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "church_contact_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"church_id" varchar(255),
	"type" "contact_type" NOT NULL,
	"mask_regex" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "church" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"public_name" varchar(255) NOT NULL,
	"cnpj" varchar(255) NOT NULL,
	"subscription_status" "subscription_status" DEFAULT 'pending' NOT NULL,
	"module_permissions" jsonb DEFAULT '[]'::jsonb,
	"stripe_customer_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "church_name_unique" UNIQUE("name"),
	CONSTRAINT "church_public_name_unique" UNIQUE("public_name"),
	CONSTRAINT "church_cnpj_unique" UNIQUE("cnpj"),
	CONSTRAINT "church_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
CREATE TABLE "member_associations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"church_id" varchar(255) NOT NULL,
	"role" "member_role" NOT NULL,
	"status" "member_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "memberAssociationsTable__unique_user_org" UNIQUE("user_id","church_id")
);
--> statement-breakpoint
CREATE TABLE "pastor_associations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"church_id" varchar(255) NOT NULL,
	"main" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pastorAssociationsTable__unique_user_church" UNIQUE("user_id","church_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"church_id" varchar(255),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "church_address" ADD CONSTRAINT "church_address_church_id_church_id_fk" FOREIGN KEY ("church_id") REFERENCES "public"."church"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "church_contact_info" ADD CONSTRAINT "church_contact_info_church_id_church_id_fk" FOREIGN KEY ("church_id") REFERENCES "public"."church"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_associations" ADD CONSTRAINT "member_associations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_associations" ADD CONSTRAINT "member_associations_church_id_church_id_fk" FOREIGN KEY ("church_id") REFERENCES "public"."church"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pastor_associations" ADD CONSTRAINT "pastor_associations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pastor_associations" ADD CONSTRAINT "pastor_associations_church_id_church_id_fk" FOREIGN KEY ("church_id") REFERENCES "public"."church"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_church_id_church_id_fk" FOREIGN KEY ("church_id") REFERENCES "public"."church"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "churchAddressTable__church_id_idx" ON "church_address" USING btree ("church_id");--> statement-breakpoint
CREATE INDEX "churchAddressTable__street_idx" ON "church_address" USING btree ("street");--> statement-breakpoint
CREATE INDEX "churchAddressTable__number_idx" ON "church_address" USING btree ("number");--> statement-breakpoint
CREATE INDEX "churchAddressTable__neighborhood_idx" ON "church_address" USING btree ("neighborhood");--> statement-breakpoint
CREATE INDEX "churchAddressTable__state_idx" ON "church_address" USING btree ("state");--> statement-breakpoint
CREATE INDEX "churchAddressTable__city_idx" ON "church_address" USING btree ("city");--> statement-breakpoint
CREATE INDEX "churchAddressTable__zip_code_idx" ON "church_address" USING btree ("zip_code");--> statement-breakpoint
CREATE INDEX "churchContactInfoTable__church_id_idx" ON "church_contact_info" USING btree ("church_id");--> statement-breakpoint
CREATE INDEX "churchContactInfoTable__type_idx" ON "church_contact_info" USING btree ("type");--> statement-breakpoint
CREATE INDEX "churchContactInfoTable__value_idx" ON "church_contact_info" USING btree ("value");--> statement-breakpoint
CREATE INDEX "churchTable__name_idx" ON "church" USING btree ("name");--> statement-breakpoint
CREATE INDEX "churchTable__public_name_idx" ON "church" USING btree ("public_name");--> statement-breakpoint
CREATE INDEX "churchTable__cnpj_idx" ON "church" USING btree ("cnpj");--> statement-breakpoint
CREATE INDEX "churchTable__subscription_status_idx" ON "church" USING btree ("subscription_status");--> statement-breakpoint
CREATE INDEX "churchTable__stripe_customer_id_idx" ON "church" USING btree ("stripe_customer_id");--> statement-breakpoint
CREATE INDEX "churchTable__created_at_idx" ON "church" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "memberAssociationsTable__user_id_idx" ON "member_associations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "memberAssociationsTable__church_id_idx" ON "member_associations" USING btree ("church_id");--> statement-breakpoint
CREATE INDEX "memberAssociationsTable__role_idx" ON "member_associations" USING btree ("role");--> statement-breakpoint
CREATE INDEX "memberAssociationsTable__status_idx" ON "member_associations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "pastorAssociationsTable__user_id_idx" ON "pastor_associations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "pastorAssociationsTable__church_id_idx" ON "pastor_associations" USING btree ("church_id");--> statement-breakpoint
CREATE INDEX "usersTable__church_id_idx" ON "users" USING btree ("church_id");--> statement-breakpoint
CREATE INDEX "usersTable__email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "usersTable__created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "usersTable__deleted_at_idx" ON "users" USING btree ("deleted_at");