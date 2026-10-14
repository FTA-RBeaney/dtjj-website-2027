ALTER TABLE "events" ADD COLUMN "image_url" text NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "image_url" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "team_members" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();