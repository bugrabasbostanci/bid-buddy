"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction, createUploadUrlAction } from "./actions";
import { pageTitleStyles } from "@/styles";
import { DatePickerDemo } from "@/components/date-picker";
import { useState } from "react";

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      return
    }
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const file = formData.get("image") as File;

    const uploadUrl = await createUploadUrlAction(file.name, file.type);

    await fetch(uploadUrl, {
      method: "PUT",
      body: file
    });

    const name = formData.get("name") as string;
    const startingPrice = parseInt(formData.get("startingPrice") as string);
    const startingPriceInCents = Math.floor(startingPrice * 100);

    await createItemAction({
      name,
      startingPrice: startingPriceInCents,
      fileName: file.name,
      endDate: date,
    });
  };

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>
        Post an Item
      </h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={handleFormSubmit}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
        />
        <DatePickerDemo
        date={date}
        setDate={setDate}
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}