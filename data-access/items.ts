import { items } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { database } from "@/app/db/database";


export async function getItem(itemId: number) {
    const item = await database.query.items.findFirst({
        where: eq(items.id, itemId),
    })

    return item
}