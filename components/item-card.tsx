import { Item } from "@/app/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image"
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollars } from "@/utils/currency";

export function ItemCard({ item }: { item: Item }) {
    return (
        <div className="border p-8 rounded-xl space-y-2" key={item.id}>
        <Image src={getImageUrl(item.fileKey)} alt={item.name} width={200} height={200} />
        <h2 className="font-bold text-xl">{item.name}</h2>
        <p className="text-lg">starting price: ${formatToDollars(item.startingPrice)}</p>

        <Button asChild>
            <Link href={`/items/${item.id}`}>Place Bid</Link>
        </Button>
    </div>
    )
}