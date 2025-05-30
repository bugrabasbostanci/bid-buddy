import { Item } from "@/app/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image"
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollars } from "@/utils/currency";
import { format } from "date-fns";
import { isBidOver } from "@/utils/bids";



export function ItemCard({ item }: { item: Item }) {
    return (
        <div className="border p-8 rounded-xl space-y-2" key={item.id}>
            <Image src={getImageUrl(item.fileKey)} alt={item.name} width={200} height={200} />
            <h2 className="font-bold text-xl">{item.name}</h2>
            <p className="text-lg">starting price: ${formatToDollars(item.startingPrice)}</p>

            {isBidOver(item) ? (
                <p className="text-lg">Bidding is Over</p>

            ) : (
                <p className="text-lg">Ends On: {format(item.endDate, "eeee MM/dd/yy")}</p>
            )}



            <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
                <Link href={`/items/${item.id}`}>{isBidOver(item) ? "View Bid" : "Place Bid"}</Link>
            </Button>
        </div>
    )
}