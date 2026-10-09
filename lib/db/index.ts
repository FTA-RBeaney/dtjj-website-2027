import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "../../lib/env";
import * as schema from "./schema";

const relations = defineRelations(schema);

const client = postgres(env.DATABASE_URL);
const db = drizzle({ client, relations });

export default db;
