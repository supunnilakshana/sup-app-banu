"use client";

import React, {useState, useEffect} from "react";
import {DataTable} from "@/components/data-table";
import CreateItemForm from "@/components/form/CreateItemForm";
import {getColumnDefs} from "./column";
import {CreateItemDto, ItemDto} from "@/dto";
import ItemService from "../../services/item_service";
import NavBar from "@/components/navbar/NavBar";
import CloudStorageService from "@/services/cloud_storage_service";
import {log} from "console";

const itemService = new ItemService();
const cloudStorageService = new CloudStorageService();

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

  async function addItem(
    data: CreateItemDto,
    file: File | null
  ): Promise<void> {
    try {
      console.log("data", data);

      if (file) {
        const path = await cloudStorageService.uploadFile(file, "items");
        if (path) {
          data.image = path;
        }
      }
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
      <NavBar />
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Items</h1>
        <CreateItemForm onSave={addItem} />
        <br />
        <DataTable columns={getColumnDefs} data={item} />
      </section>
    </div>
  );
}

export default Item;
