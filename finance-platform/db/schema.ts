import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const accounts = pgTable("accounts", {
    id:text("id").primaryKey(),
    name: text("name").notNull(),
    user_id: text("user_id").notNull(),
    
})

export const insertAccountSchema = createInsertSchema(accounts);