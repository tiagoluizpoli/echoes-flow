import { defineConfig } from 'drizzle-kit';
import { env } from 'src/shared-modules/core/';

export default defineConfig({
  out: './drizzle',
  schema: './src/shared-modules/database/drizzle-setup/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
