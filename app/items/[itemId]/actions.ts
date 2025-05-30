"use server"

import { auth } from "@/auth"
import { database } from "@/app/db/database"
import { bids, items } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createBidAction(itemId: number) {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        throw new Error("You must be logged in to place a bid")
    }

    const item = await database.query.items.findFirst({
        where: eq(items.id, itemId)
    })

    if (!item) {
        throw new Error("Item not found")
    }

    const latestBidValue = item.currentBid + item.bidInterval

    // wrap this all with Promise and make it fast and more performant TODO
    // 2:24:20 = race condition => 2 people try to bid at same time 
    await database.insert(bids).values({
        amount: latestBidValue,
        itemId,
        userId: session.user.id,
        timestamp: new Date()
    })

    await database.update(items).set({
        currentBid: latestBidValue
    }).where(eq(items.id, itemId))

    revalidatePath(`/items/${itemId}`)
}