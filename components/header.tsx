import { auth } from "@/auth";
import Image from "next/image";
import { SignOut } from "./sign-out";
import SignIn from "./sign-in";
import Link from "next/link";

export async function Header() {
    const session = await auth()


    return (
        <div className="bg-gray-200 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-1 hover:underline">
                        <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        BidBuddy.com
                    </Link>

                    <div>
                        <Link href="/items/create" className="flex items-center gap-1 hover:underline">
                            Auction an Item
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">

                    <div>{session?.user?.name}</div>
                    <div className="">{session ? <SignOut /> : <SignIn />}</div>
                </div>
            </div>
        </div>
    )
}