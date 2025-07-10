import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const accounts = pgTable("accounts", {
    id:text("id").primaryKey(),
    plaidId: text("plaid_id").notNull(),
    name: text("name").notNull(),
    user_id: text("user_id").notNull(),
})