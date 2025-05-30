"use server"

import { database } from "@/app/db/database";
import { items } from "@/app/db/schema";
import { auth } from "@/auth";
import { getSignedUrlForS3Object } from "@/lib/s3";
import { redirect } from "next/navigation";


export async function createUploadUrlAction(key: string, type: string) {
    return await getSignedUrlForS3Object(key, type)
}


export async function createItemAction({fileName, name, startingPrice, endDate}: {fileName: string, name: string, startingPrice: number, endDate: Date}) {
    const session = await auth()

    if (!session) {
        throw new Error("Unauthorized")
    }

    const user = session.user

    if (!user || !user.id) {
        throw new Error("Unauthorized")
    }


    await database.insert(items).values({
        name,
        startingPrice,
        fileKey: fileName,
        userId: user.id,
        endDate,
    })
    redirect("/")
}

