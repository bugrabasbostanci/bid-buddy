import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function EpmtyState() {
    return (
        <div className="space-y-8 flex flex-col items-center justify-center">
            <Image src="/package.svg" alt="Package" width={200} height={200}/>
            <h2 className="text-2xl font-bold">You have no auctions yet</h2>
            <Button asChild>
                <Link href="/items/create">Create Auction</Link>
            </Button>
        </div>
    )
}