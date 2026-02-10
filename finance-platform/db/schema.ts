import { date } from 'drizzle-orm/mysql-core';
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import {relations} from 'drizzle-orm';
import { z } from 'zod';

export const accounts = pgTable("accounts", {
    id:text("id").primaryKey(),
    name: text("name").notNull(),
    user_id: text("user_id").notNull(),
    
})

export const accountsRelations = relations(accounts, ({many}) => ({
    transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
    id:text("id").primaryKey(),
    name: text("name").notNull(),
    user_id: text("user_id").notNull(),
    
})
export const categoriesRelations = relations(categories, ({many}) => ({
    transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
    id:text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date").notNull().defaultNow(),
    account_id: text("account_id").notNull().references(() => accounts.id, {onDelete: "cascade",}).notNull(),
    category_id: text("category_id").notNull().references(() => categories.id, {onDelete: "set null",}).notNull(),
    user_id: text("user_id").notNull(),
    description: text("description"),}
);

export const transactionsRelations = relations(transactions, ({one}) => ({
    account: one(accounts, {
        fields: [transactions.account_id],
        references: [accounts.id],
    }),
    category: one(categories, {
        fields: [transactions.category_id],
        references: [categories.id],
    }), 
}));

export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date(),
});