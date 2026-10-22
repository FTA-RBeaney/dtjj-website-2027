CREATE TABLE "attendees" (
	"id" uuid PRIMARY KEY,
	"event_id" uuid NOT NULL,
	"first_name" text,
	"last_name" text,
	"preferred_name" text NOT NULL,
	"email" text NOT NULL,
	"t_shirt" boolean DEFAULT false NOT NULL,
	"t_shirt_size" text NOT NULL,
	"t_shirt_color" text NOT NULL,
	"ticket_type_id" uuid NOT NULL,
	"country" text NOT NULL,
	"pronouns" text NOT NULL,
	"hosting" text NOT NULL,
	"pay_it_forward" boolean DEFAULT false NOT NULL,
	"pay_it_forward_amount" text,
	"payment_status" text NOT NULL,
	"stripe_payment_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"location" text NOT NULL,
	"image_url" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"coordinates" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "venues" ENABLE ROW LEVEL SECURITY;