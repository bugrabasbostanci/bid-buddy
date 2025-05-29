import { Button } from "@/components/ui/button";
import { database } from "./db/database";
import { items } from "./db/schema";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth()

  const allItems = await database.select().from(items);
  // const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-2">
      <h1 className="text-4xl font-bold mb-8">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div className="border p-8 rounded-xl" key={item.id}>
            {item.name}
            starting price: ${item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  )
}