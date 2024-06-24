"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import CreateItemForm from "@/components/form/CreateItemForm";
import { getColumnDefs } from "./column";
import { CreateItemDto, ItemDto, UpdateItemDto } from "@/dto";
import ItemService from "../../services/item_service";
import NavBar from "@/components/navbar/NavBar";
import CloudStorageService from "@/services/cloud_storage_service";
import { log } from "console";

const itemService = new ItemService();
const cloudStorageService = new CloudStorageService();

function Item() {
  const [item, setItem] = useState<ItemDto[]>([]);
  const [filterItem, setFilterItem] = useState<ItemDto[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const filteredItems = item.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterItem(filteredItems);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsData = await itemService.getItems();
        setItem(itemsData);
        setFilterItem(itemsData);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">Store Items</h1>

        <br />
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="border-2 p-1 w-1/4 my-3"
        />

        <DataTable columns={getColumnDefs({})} data={filterItem} />
      </section>
    </div>
  );
}

export default Item;
