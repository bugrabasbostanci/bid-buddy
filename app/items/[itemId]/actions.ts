"use server"

import { auth } from "@/auth"
import { database } from "@/app/db/database"
import { bids, items } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { Knock } from "@knocklabs/node";
import { env } from "@/env";

const knock = new Knock({
    apiKey: env.KNOCK_SECRET_KEY
});

export async function createBidAction(itemId: number) {
    const session = await auth()

    const userId = session?.user?.id;

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

    const currentBids = await database.query.bids.findMany({
        where: eq(bids.itemId, itemId),
        with: {
            user: true
        }
    })

    const recipients: {
        id: string;
        name: string;
        email: string;
    }[] = [];

    for (const bid of currentBids) {
        if (
            bid.userId !== userId &&
            !recipients.find((recipient) => recipient.id === bid.userId)
        ) {
            recipients.push({
                id: bid.userId + "",
                name: bid.user.name ?? "Anonymous",
                email: bid.user.email || "",
            });
        }
    }

    if (recipients.length > 0) {
        await knock.workflows.trigger("user-placed-bid", {
            actor: {
                id: userId + "", // Convert to string
                name: session.user.name ?? "Anonymous",
                email: session.user.email ?? "", // Provide empty string as fallback
                collection: "users",
            },
            recipients,
            data: {
                itemId,
                bidAmount: latestBidValue,
                itemName: item.name,
            },
        });
    }


    // send notifications to everyone else on this item who has placed a bid


    revalidatePath(`/items/${itemId}`)
}