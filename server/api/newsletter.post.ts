import { NewsletterSchema } from "#shared/schemas/newsletter";
import { syncContactToBrevo } from "../utils/brevo";

export default defineEventHandler(async (event) => {
  const body = NewsletterSchema.parse(await readBody(event));

  await syncContactToBrevo(body);

  return { ok: true };
});
