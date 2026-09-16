import { sql } from 'drizzle-orm'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().default(sql`gen_random_uuid()`),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }),
  avatar: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  google_id: varchar({ length: 255 }).unique(),
})
