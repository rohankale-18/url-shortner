CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(10) NOT NULL,
	"long_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"click_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "urls_code_unique" UNIQUE("code")
);
