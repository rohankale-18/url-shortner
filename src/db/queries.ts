// apps/api/src/db/queries.ts
import { db } from "./client"
import { urls } from "./schema"
import { count, eq } from "drizzle-orm"
import { nanoid } from "nanoid"

export async function createShortUrl(longUrl: string) {
  const code = nanoid(6);

  // Try to insert a new row
  const [newUrl] = await db
    .insert(urls)
    .values({ code, longUrl })
    .onConflictDoNothing({ target: urls.longUrl }) // if URL already exists, do nothing
    .returning();

  if (newUrl) {
    return newUrl; // inserted successfully
  }

  // If insert was skipped, fetch the existing row
  const [existing] = await db.select().from(urls).where(eq(urls.longUrl, longUrl));
  return existing!;
}


export async function getAndIncrement(code: string) {
  const [url] = await db
    .select()
    .from(urls)
    .where(eq(urls.code, code))

  if (!url) return null

  await db
    .update(urls)
    .set({ clickCount: url.clickCount + 1 })
    .where(eq(urls.id, url.id))

  return url.longUrl
}

export async function getUrlCount() {
  const [row] = await db.select({ value: count() }).from(urls)
  return row.value
}