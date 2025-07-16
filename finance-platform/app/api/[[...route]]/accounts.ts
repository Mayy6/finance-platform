import {Hono} from 'hono';
import {db} from "@/db/drizzle";
import { accounts, insertAccountSchema } from '@/db/schema';
import {clerkMiddleware, getAuth} from '@hono/clerk-auth';
import {eq} from 'drizzle-orm';
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
                id: accounts.id,
                name: accounts.name,}
                
            ).from(accounts).where(eq(accounts.user_id, auth.userId));
            return c.json({data})
    })
    .post("/",
        clerkMiddleware(),

        // Validate the request body using zod. if want to insert the acct name we have to 
        // validate if the name is provided and the format of the name is correct.
        zValidator("json", insertAccountSchema.pick({name: true})),

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

           const data = await db.insert(accounts).values({
            id: crypto.randomUUID(), // Generate a unique id
            user_id: auth.userId, // Associate with the current user
            ...values, // Spread the validated name field
           }).returning();

        // const [data] = await db.insert(accounts).values({
        //     id: crypto.randomUUID(), // Generate a unique id
        //     user_id: auth.userId, // Associate with the current user
        //     name:"test", // Spread the validated name field
        // }).returning();

           console.log("Inserted account:", data);

           return c.json({data});

           
        }
    );

export default app;

