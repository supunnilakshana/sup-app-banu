"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import CreateItemForm from "@/components/form/CreateItemForm";
import { getColumnDefs } from "./column";
import { CreateItemDto, ItemDto } from "@/dto";
import ItemService from "../../services/item_service";

const itemService = new ItemService();

function Item() {
  const [item, setItem] = useState<ItemDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsData = await itemService.getItem();
        setItem(itemsData);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }

    fetchData();
  }, []);

  async function addItem(data: CreateItemDto): Promise<void> {
    try {
      await itemService.createItem(data);
      const itemsData = await itemService.getItem();
      setItem(itemsData);
      alert("Item added successfully");
    } catch (error) {
      console.error("Error fetching item:", error);
      alert("Error fetching item ");
    }
  }

  return (
    <div>
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Items</h1>
        <CreateItemForm onSave={addItem} />
        <DataTable columns={getColumnDefs} data={item} />
      </section>
    </div>
  );
}

export default Item;
