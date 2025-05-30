import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles";
import Link from "next/link";
import Image from "next/image"
import { getImageUrl } from "@/utils/files";
import { formatDistance } from "date-fns";
import { formatToDollars } from "@/utils/currency";
import { createBidAction } from "./actions";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { isBidOver } from "@/utils/bids";


function formatTimestamp(timestamp: Date) {
    return formatDistance(timestamp, new Date(), { addSuffix: true })
}


export default async function ItemPage({
    params,
}: {
    params: { itemId: string }
}) {    const itemId = params.itemId
    const item = await getItem(parseInt(itemId))

    const session = await auth()


    if (!item) {
        return (
            <div className="space-y-8 flex flex-col items-center mt-12">
                <Image
                    src="/package.svg"
                    alt="Package"
                    width={200}
                    height={200}
                />

                <h1 className={pageTitleStyles}>Item not found</h1>
                <p className="text-center">The item you&apos;re trying to view is invalid. <br /> Please go back and search for a different auction item.</p>
                <Button asChild>
                    <Link href={`/`}>View Auctions</Link>
                </Button>
            </div>
        )
    }


    const allBids = await getBidsForItem(item.id)


    const hasBids = allBids.length > 0

    const isBiddingOver = isBidOver(item)

    const canPlaceBid = session && item.userId !== session.user.id && !isBidOver(item)

    return (
        <main className="space-y-8">
            <div className="flex gap-8">
                {/* Left side */}
                <div className="flex flex-col gap-6">
                    <h1 className={pageTitleStyles}><span className="font-normal">Auction for</span>{item.name}</h1>

                    {isBidOver(item) && (
                        <Badge variant="destructive" className="w-fit">Bidding is Over</Badge>
                    )}
                    <Image
                        className="rounded-xl"
                        src={getImageUrl(item.fileKey)}
                        alt={item.name}
                        width={400}
                        height={400}
                    />

                    <div className="text-xl space-y-4">
                        <div>
                            Current Bid{" "} <span className="font-bold">${formatToDollars(item.currentBid)}</span>
                        </div>
                        <div>
                            Starting Price of{" "} <span className="font-bold">${formatToDollars(item.startingPrice)}</span>
                        </div>
                        <div
                        >Bid Interval <span className="font-bold">${formatToDollars(item.bidInterval)}</span>
                        </div>
                    </div>
                </div>


                {/* Right side */}
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">Current Bids</h2>
                        {canPlaceBid && (
                            <form action={createBidAction.bind(null, item.id)}>
                                <Button>Place a Bid</Button>
                            </form>
                        )}

                    </div>

                    {hasBids ? (
                        <ul className="space-y-4">
                            {allBids.map((bid) => (
                                <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                                    <div className="flex gap-4">
                                        <div>
                                            <span className="font-bold">${formatToDollars(bid.amount)}</span> by {" "}
                                            <span className="font-bold">{bid.user.name}</span>
                                        </div>
                                        <div className="">{formatTimestamp(bid.timestamp)}</div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
                            <Image src="/package.svg" alt="Package" width={200} height={200} />
                            <h2 className="text-2xl font-bold">No bids yet</h2>
                            {canPlaceBid && (
                                <form action={createBidAction.bind(null, item.id)}>
                                    <Button>Place a Bid</Button>
                                </form>
                            )}
                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}