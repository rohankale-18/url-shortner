import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core"

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  longUrl: text("long_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  clickCount: integer("click_count").default(0).notNull(),
})