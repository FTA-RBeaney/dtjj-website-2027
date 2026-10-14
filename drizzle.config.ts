import { defineConfig } from "drizzle-kit";
import env from "./lib/env";
import "dotenv/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
