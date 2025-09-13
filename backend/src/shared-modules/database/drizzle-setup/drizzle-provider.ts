import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { env } from 'src/shared-modules/core';


const pool = new Pool({
  connectionString: env.DATABASE_URL
});

export const db = drizzle(pool, { schema });

export type DrizzleDatabase = typeof db;

export const DRIZLE_DB = Symbol('DRIZLE_DB');

export const DrizzleProvider: Provider = {
  provide: DRIZLE_DB,
  useFactory: () => {
    return db;
  },
};
