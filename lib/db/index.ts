import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import getEnv from "../../lib/env";
import * as schema from "./schema";

const relations = defineRelations(schema);

function createDb() {
  const client = postgres(getEnv().DATABASE_URL);
  return drizzle({ client, relations });
}

let instance: ReturnType<typeof createDb> | undefined;

// Connects on first use rather than at import, so the Worker can start
// (and pass Cloudflare's deploy check) before env vars are available.
const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    instance ??= createDb();
    const value = Reflect.get(instance, prop, instance);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export default db;
