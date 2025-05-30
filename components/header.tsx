"use client"

import Image from "next/image";
import Link from "next/link";
import { NotificationCell, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { useRef, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { formatToDollars } from "@/utils/currency";



export function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const session = useSession()

    const userId = session?.data?.user?.id;

    return (
        <div className="bg-gray-200 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-1 hover:underline">
                        <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        BidBuddy.com
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-1 hover:underline">
                            All Auctions
                        </Link>

                        {userId && (<>
                            <Link href="/items/create" className="flex items-center gap-1 hover:underline">
                                Create Auction
                            </Link>

                            <Link href="/auctions" className="flex items-center gap-1 hover:underline">
                                My Auctions
                            </Link>
                        </>)}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {userId && (
                        <>
                            <NotificationIconButton
                                ref={notifButtonRef}
                                onClick={(e) => setIsVisible(!isVisible)}
                            />
                            <NotificationFeedPopover
                                buttonRef={notifButtonRef}
                                isVisible={isVisible}
                                onClose={() => setIsVisible(false)}
                                renderItem={({ item, ...props }) => (
                                    <NotificationCell key={item.id} {...props} item={item}>
                                        <div className="rounded-xl">
                                            <Link href={`/items/${item?.data?.itemId}`}
                                                className="text-blue-400 hover:text-blue-500"
                                            >
                                                Someone outbided you on <span className="font-bold">{item?.data?.itemName}</span>{" "}
                                                by $ {formatToDollars(item?.data?.bidAmount)}
                                            </Link>
                                        </div>
                                    </NotificationCell>
                                )}
                            />
                        </>
                    )}
                    {session.data?.user.image && (
                        <Image
                            src={session.data?.user.image}
                            width={40}
                            height={40}
                            alt="User Avatar"
                            className="rounded-md"
                        />
                    )}
                    <div>{session?.data?.user?.name}</div>
                    <div>{userId ? <Button type="submit"
                        onClick={() => signOut({
                            callbackUrl: "/"
                        })}
                    >Sign Out</Button> :
                        <Button type="submit"
                            onClick={() => signIn()}
                        >Sign In</Button>
                    }</div>
                </div>
            </div>
        </div>
    )
}