import {Hono} from 'hono';
import {db} from "@/db/drizzle";
import { categories, insertCategorySchema } from '@/db/schema';
import {clerkMiddleware, getAuth} from '@hono/clerk-auth';
import {and, eq, inArray} from 'drizzle-orm';
import {zValidator} from '@hono/zod-validator';
import z from 'zod';

const app = new Hono()
    .get("/", 
        clerkMiddleware(),
        async (c) =>{
            const auth = getAuth(c);
            console.log("auth check");
            if(!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
            }

            
            const data = await db.select({
                id: categories.id,
                name: categories.name,
            }).from(categories).where(eq(categories.user_id, auth.userId));
            return c.json({data})
    })
    .get("/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");

            if(!id) {
                return c.json({error: "Account ID is required"}, 400);
            }

            if (!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
            }

            const [data] = await db.select({
                id: categories.id,
                name: categories.name,
            }).from(categories).where(
                and(
                    eq(categories.id, id),
                    eq(categories.user_id, auth.userId)
                )
            );

            if (!data) {
                return c.json({error: "Account not found"}, 404);
            }

            return c.json({data});

        }

    )
    .post("/",
        clerkMiddleware(),

        // Validate the request body using zod. if want to insert the acct name we have to 
        // validate if the name is provided and the format of the name is correct.
        zValidator("json", insertCategorySchema.pick({name: true})),

        async (c) => {
            console.log("tttttttttttest")
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
            }

            if (typeof values.name !== "string") {
                return c.json({ error: "Invalid name" }, 400);
    }

           const data = await db.insert(categories).values({
            id: crypto.randomUUID(), // Generate a unique id
            user_id: auth.userId, // Associate with the current 
            ...values, // Spread the validated name field
           }).returning();

        

           console.log("Inserted account:", data);

           return c.json({data});

           
        }
    )
    .post("/bulk",
        clerkMiddleware(),
        // Validate the request body using zod. if want to insert the acct name we have to
        zValidator("json", z.object({
           ids:z.array(z.string()),
        })), 
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
            }

            const data = await db.delete(categories).where(
                and(
                    eq(categories.user_id, auth.userId),
                    inArray(categories.id, values.ids)
                )
            )
            .returning({
                id: categories.id,
            })

            
            return c.json({data});

        }
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        zValidator("json", insertCategorySchema.pick({name: true})),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
            }

            if (!id) {
                return c.json({error: "Account ID is required"}, 400);
            }

            const [data] = await db.update(categories)
                .set({
                    name: values.name,
                })
                .where(
                    and(
                        eq(categories.id, id),
                        eq(categories.user_id, auth.userId)
                    )
                )
                .returning({
                    id: categories.id,
                    name: categories.name,
                });

            if (!data) {
                return c.json({error: "Account not found"}, 404);
            }

            return c.json({data});
        }
    )
    .delete(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");

            if (!auth?.userId) {
                return c.json({error: "Unauthorized"}, 401);
            }

            if (!id) {
                return c.json({error: "Account ID is required"}, 400);
            }

            const [data] = await db.delete(categories)
                .where(
                    and(
                        eq(categories.id, id),
                        eq(categories.user_id, auth.userId)
                    )
                )
                .returning({
                    id: categories.id,
                    name: categories.name,
                });

            if (!data) {
                return c.json({error: "Account not found"}, 404);
            }

            return c.json({data});
        }
    )

export default app;

