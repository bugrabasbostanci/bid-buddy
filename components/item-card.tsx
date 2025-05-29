import { Item } from "@/app/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image"

export function ItemCard({ item }: { item: Item }) {
    return (
        <div className="border p-8 rounded-xl space-y-2" key={item.id}>
        <Image src={getImageUrl(item.fileKey)} alt={item.name} width={200} height={200} />
        <h2 className="font-bold text-xl">{item.name}</h2>
        <p className="text-lg">starting price: ${item.startingPrice / 100}</p>
    </div>
    )
}