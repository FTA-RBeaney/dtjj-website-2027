import { newsletterSchema } from "../../shared/schemas/newsletter";
import { syncContactToBrevo } from "../utils/brevo";

export default defineEventHandler(async (event) => {
  const body = newsletterSchema.parse(await readBody(event));

  await syncContactToBrevo(body);

  return { ok: true };
});
