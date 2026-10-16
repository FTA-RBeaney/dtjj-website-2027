CREATE TYPE "app_role" AS ENUM('member', 'admin');--> statement-breakpoint
CREATE TYPE "profile_status" AS ENUM('pending', 'approved');--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"role" "app_role" DEFAULT 'member'::"app_role" NOT NULL,
	"status" "profile_status" DEFAULT 'pending'::"profile_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;--> statement-breakpoint
CREATE POLICY "profiles_select_own" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("profiles"."id" = (select auth.uid()));