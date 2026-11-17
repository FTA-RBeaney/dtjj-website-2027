import { z } from "zod";
import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

let env: EnvSchema | undefined;

// Validated on first call, not at import: on Cloudflare Workers the env vars
// aren't available while the script is loaded (including the deploy-time startup check).
export default function getEnv(): EnvSchema {
  if (!env) {
    tryParseEnv(EnvSchema);
    // eslint-disable-next-line node/no-process-env
    env = EnvSchema.parse(process.env);
  }
  return env;
}
