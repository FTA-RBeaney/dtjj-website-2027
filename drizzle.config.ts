import { defineConfig } from "drizzle-kit";
import getEnv from "./lib/env";
import "dotenv/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getEnv().DATABASE_URL,
  },
});
