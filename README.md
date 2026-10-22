# Downtown Jazz Jam website

The website for **Downtown Jazz Jam**. It does two jobs:

- **Public site.** Home, About, FAQ and Contact pages, a newsletter sign-up that syncs to Brevo, and an embedded video player (Mux / Video.js).
- **Admin area.** A dashboard (`/admin`) and settings pages (`/settings`) where approved admins manage events, ticket types and the team. People sign in with a magic link sent by email. No passwords are involved.

## Tech stack

| Area             | Tool                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Framework        | [Nuxt 4](https://nuxt.com) (Vue 3, Nitro server routes in `server/api`)                     |
| UI               | [Nuxt UI 4](https://ui.nuxt.com) + Tailwind CSS 4                                           |
| Auth             | [Supabase Auth](https://supabase.com/docs/guides/auth) via `@nuxtjs/supabase` (magic links) |
| Database         | Supabase Postgres                                                                           |
| ORM / migrations | [Drizzle ORM + drizzle-kit](https://orm.drizzle.team) (`1.0.0-rc`)                          |
| Email            | [Brevo](https://www.brevo.com): SMTP for auth emails, API for newsletter contacts           |
| Validation       | Zod (env vars, API bodies)                                                                  |
| Tests / lint     | Vitest, ESLint (`@antfu/eslint-config`), Husky + lint-staged                                |
| Hosting          | Netlify                                                                                     |

## Project structure

```
app/                Nuxt app: pages, layouts, components, composables
  pages/            index, about, faq, contact (public); login, signup, confirm (auth);
                    admin/, settings/ (admin area)
  layouts/          website (public), auth, default (dashboard)
server/
  api/              API routes (events, team, ticket-types, newsletter)
  utils/            requireAdmin, Brevo sync, shared server helpers
shared/schemas/     Zod schemas used by both client and server
lib/
  env.ts            Zod-validated env vars for server/tooling (needs DATABASE_URL)
  db/               Drizzle client (index.ts) and table definitions (schema/)
drizzle/            Generated SQL migrations. Commit these.
supabase/
  config.toml       Local Supabase config (auth, SMTP, email templates)
  templates/        Auth email templates (magic link)
  functions/        Supabase Edge Functions (send-email)
test/               Vitest tests
docs/               Agent docs (issue tracker, domain docs)
```

## Getting it running locally

### Prerequisites

- **Node 24.** See `.nvmrc`; run `nvm use`.
- **pnpm.** The version is pinned in `package.json` under `packageManager`. Run `corepack enable` and the right version is picked up automatically.
- **Docker Desktop.** The local Supabase stack runs in Docker.
- **Supabase CLI.** `pnpm dev:db` runs it through `npx`, so you don't need a global install.

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start local Supabase

```bash
pnpm dev:db          # = npx supabase start
npx supabase status  # prints the URLs and keys you need below
```

This starts Postgres, Auth, Storage and Studio in Docker:

| Service                   | URL                                                       |
| ------------------------- | --------------------------------------------------------- |
| API                       | http://127.0.0.1:54321                                    |
| Postgres                  | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |
| Studio (DB admin UI)      | http://127.0.0.1:54323                                    |
| Mailpit (captured emails) | http://127.0.0.1:54324                                    |

Stop it with `npx supabase stop`.

### 3. Create `.env`

Create a `.env` file in the repo root. It is git-ignored.

```bash
# Postgres connection used by the app and by drizzle-kit
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Supabase (values from `npx supabase status`)
NUXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NUXT_PUBLIC_SUPABASE_KEY=<anon / publishable key>

# Brevo
BREVO_API_KEY=<Brevo API key>        # newsletter contact sync (server/utils/brevo.ts)
BREVO_SMTP_USER=<Brevo SMTP login>   # used by supabase/config.toml for auth emails
BREVO_SMTP_KEY=<Brevo SMTP key>
```

`DATABASE_URL` is checked by Zod in `lib/env.ts`. If it's missing, the app and drizzle-kit fail straight away with a "Missing required values in .env" error.

### 4. Run the database migrations

```bash
pnpm drizzle-kit migrate
```

This applies everything in `drizzle/` to your local database. See [Database & migrations](#database--migrations) below.

### 5. Start the dev server

```bash
pnpm dev
```

The site runs at http://localhost:3000.

### 6. Make yourself an admin

New sign-ups get a `profiles` row with `role = 'member'` and `status = 'pending'`. A database trigger creates that row. Only approved admins can reach the admin API routes (see `server/utils/requireAdmin`). After you've signed up once, promote yourself in Studio's SQL editor:

```sql
update public.profiles
set role = 'admin', status = 'approved'
where email = 'you@example.com';
```

### Local auth emails

`supabase/config.toml` enables Brevo SMTP (`[auth.email.smtp]`), so locally the magic links are **sent as real emails** through Brevo. This only works if `BREVO_SMTP_USER` and `BREVO_SMTP_KEY` are set. The local email rate limit is also very low (`email_sent = 2` per hour).

To catch emails in Mailpit (http://127.0.0.1:54324) instead, set `enabled = false` under `[auth.email.smtp]` and restart Supabase (`npx supabase stop && pnpm dev:db`). Don't commit that change.

## Database & migrations

**Drizzle owns the database schema.** Tables are defined in TypeScript in `lib/db/schema/`. drizzle-kit generates SQL migrations from those files into `drizzle/` and applies them to whatever database `DATABASE_URL` points at (see `drizzle.config.ts`).

We don't use Supabase's own migrations folder (`supabase/migrations`). Don't create tables in Studio by hand either, or Drizzle's snapshots drift from the real database.

There are no `package.json` shortcuts for drizzle-kit. Call it with `pnpm drizzle-kit <command>`.

### Changing the schema

1. Edit or add a table in `lib/db/schema/`. If it's a new file, **export it from `lib/db/schema/index.ts`**. drizzle-kit only sees what that file exports.
2. Generate a migration and give it a descriptive name:

   ```bash
   pnpm drizzle-kit generate --name add-ticket-types
   ```

   This creates `drizzle/<timestamp>_add-ticket-types/` containing `migration.sql` and `snapshot.json`.

3. **Read the generated SQL** before applying it, especially for renames and dropped columns.
4. Apply it:

   ```bash
   pnpm drizzle-kit migrate
   ```

5. Commit the schema change and the new `drizzle/` folder together.

### Custom SQL migrations

Some things can't be expressed in the Drizzle schema, such as functions and triggers on Supabase's `auth.users`. For those, generate an empty migration and write the SQL yourself:

```bash
pnpm drizzle-kit generate --custom --name handle-new-user
```

`drizzle/20261014144359_handle-new-user` is an example. It creates the trigger that inserts a `profiles` row whenever someone signs up. Separate statements with `--> statement-breakpoint`.

### Row Level Security

Tables are created with `pgTable.withRLS(...)` and policies are defined in the schema with `pgPolicy`. Helpers such as `authUid`, `authenticatedRole` and `authUsers` come from `drizzle-orm/supabase`. Server routes connect directly with `DATABASE_URL`, which bypasses RLS, so admin checks happen in code via `requireAdmin`. The policies only matter for queries made from the browser through the Supabase client.

### Other useful commands

```bash
pnpm drizzle-kit studio   # browse the DB with Drizzle Studio
pnpm drizzle-kit check    # check migrations for consistency/conflicts
```

### Resetting the local database

`npx supabase db reset` wipes the local database and runs only Supabase's own migrations and seed. **It does not run the Drizzle migrations**, so run `pnpm drizzle-kit migrate` again afterwards. Then sign up and promote yourself to admin again.

## Scripts

| Command                         | What it does                         |
| ------------------------------- | ------------------------------------ |
| `pnpm dev`                      | Nuxt dev server on :3000             |
| `pnpm dev:db`                   | Start local Supabase (Docker)        |
| `pnpm build`                    | Production build                     |
| `pnpm preview`                  | Preview the production build locally |
| `pnpm lint` / `pnpm lint:fix`   | ESLint                               |
| `pnpm typecheck`                | `nuxt typecheck` (vue-tsc)           |
| `pnpm test` / `pnpm test:watch` | Vitest                               |

A Husky pre-commit hook runs lint-staged, which runs `pnpm lint`. GitHub Actions runs lint and typecheck on every push (`.github/workflows/ci.yml`), and lint again on PRs to `main`.

## Supabase (hosted / production)

Local Supabase is configured by `supabase/config.toml`. A hosted project **doesn't read that file automatically**, so production needs its own setup. Do these steps once per environment.

1. **Create a project** at [supabase.com](https://supabase.com), ideally in a London or EU region.
2. **Link the CLI** to it:

   ```bash
   npx supabase login
   npx supabase link --project-ref <project-ref>
   ```

3. **Run the Drizzle migrations against production.** In the dashboard, open **Connect** and copy the **Session pooler** connection string (port `5432`). Use that one rather than the transaction pooler, because migrations run DDL. Then:

   ```bash
   DATABASE_URL="postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres" \
     pnpm drizzle-kit migrate
   ```

   Repeat this for every new migration **before** deploying code that depends on it.

4. **Configure Auth.** Go to Dashboard → Authentication.
   - **URL Configuration.** Set _Site URL_ to the production domain. Add `https://<your-domain>/confirm` to _Redirect URLs_, along with Netlify preview URLs if you want logins to work on deploy previews (e.g. `https://*--<netlify-site>.netlify.app/**`). The login page redirects to `/confirm`.
   - **SMTP.** Turn on custom SMTP: host `smtp-relay.brevo.com`, port `587`, your Brevo SMTP user and key. Sender is `info@downtownjazzjam.uk` / "Downtown Jazz Jam". The domain needs to be verified in Brevo.
   - **Email templates → Magic Link.** Paste in `supabase/templates/magic_link.html` and set the subject to "Your Downtown Jazz Jam login link".
   - **Rate limits.** Raise the email limit from the local value of 2/hour.

   You can push some of these settings from `config.toml` with `npx supabase config push`. Check the diff it shows carefully, because `site_url` and the redirect URLs in that file point at localhost.

5. **Deploy the Edge Function** (`supabase/functions/send-email`) and set its secrets:

   ```bash
   npx supabase secrets set BREVO_API_KEY=<key> SENDER_EMAIL=info@downtownjazzjam.uk
   npx supabase functions deploy send-email
   ```

6. **Create the first admin.** Sign up on the live site, then run the `update public.profiles ...` SQL from [step 6](#6-make-yourself-an-admin) in the dashboard's SQL editor.

## Deploying to Netlify

Nuxt (Nitro) detects Netlify on its own and builds server routes as Netlify Functions, so you don't need a special preset or adapter.

1. **Create the site.** In Netlify, go to _Add new site → Import an existing project_ and choose `FTA-RBeaney/dtjj-website-2027`.
2. **Build settings:**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Netlify reads the Node version from `.nvmrc` (24) and the pnpm version from `packageManager`. If the build complains about pnpm, add a `PNPM_VERSION` environment variable that matches `package.json`.
3. **Environment variables.** Under _Site configuration → Environment variables_, add:

   | Variable                   | Value                                                                                              |
   | -------------------------- | -------------------------------------------------------------------------------------------------- |
   | `DATABASE_URL`             | Supabase **Transaction pooler** string (port `6543`), which suits short-lived serverless functions |
   | `NUXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co`                                                                |
   | `NUXT_PUBLIC_SUPABASE_KEY` | The project's anon / publishable key                                                               |
   | `BREVO_API_KEY`            | Brevo API key (newsletter sync)                                                                    |

   `BREVO_SMTP_*` aren't needed on Netlify. Supabase sends the auth emails using the SMTP settings in its dashboard.

4. **Prepared statements.** Supabase's transaction pooler doesn't support prepared statements. `lib/db/index.ts` currently creates the client with `postgres(env.DATABASE_URL)`. Before going live on the pooler, change it to `postgres(env.DATABASE_URL, { prepare: false })`, or queries will fail intermittently.
5. **Domain.** Add the custom domain in Netlify, then make sure the Supabase _Site URL_ and _Redirect URLs_ match it (see above).
6. **Deploy order.** Netlify doesn't run migrations. When a change includes a new migration, run `pnpm drizzle-kit migrate` against production first, then merge or deploy.

Optionally, add a `netlify.toml` to keep the build settings in the repo:

```toml
[build]
command = "pnpm build"
publish = "dist"
```

## Contributing / agent docs

- Issues are tracked in GitHub Issues (`FTA-RBeaney/dtjj-website-2027`). See `docs/agents/issue-tracker.md`.
- Domain terminology and decisions are recorded in `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
- Renovate keeps dependencies up to date (`renovate.json`).
