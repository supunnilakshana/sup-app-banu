"use client";

import React, {useState, useEffect} from "react";
import {DataTable} from "@/components/data-table";
import CreateStoreItemForm from "@/components/form/CreateStoreItemForm";
import {getColumnDefs} from "./column";
import {CreateStoreItemDto, StoreItemDto, UpdateStoreItemDto} from "@/dto";
import StoreItemService from "../../../services/store_item_service";
import NavBar from "@/components/navbar/NavBar";
import {useParams} from "next/navigation";

const storeItemService = new StoreItemService();

function Test() {
  const [storeItem, setStoreItem] = useState<StoreItemDto[]>([]);
  const params = useParams();
  const itemId = params.id as String;

  useEffect(() => {
    async function fetchData() {
      try {
        const storeItemsData = await storeItemService.getStoreItemByItemId(
          itemId
        );
        setStoreItem(storeItemsData);
      } catch (error) {
        console.error("Error fetching store items:", error);
      }
    }

    fetchData();
  }, []);

  async function addStoreItem(data: CreateStoreItemDto): Promise<void> {
    try {
      await storeItemService.createStoreItem(data);
      const storeItemsData = await storeItemService.getStoreItemByItemId(
        itemId
      );
      setStoreItem(storeItemsData);
      alert("Store Item added successfully");
    } catch (error) {
      alert("AlReady Add this Item in Store");
      console.error("Error fetching store Items:", error);
      alert("Error fetching store Items ");
    }
  }

  async function editStoreItem(
    data: UpdateStoreItemDto,
    id: number
  ): Promise<void> {
    try {
      await storeItemService.updateStoreItem(data, id);
      const storeItemData = await storeItemService.getStoreItemByItemId(itemId);
      setStoreItem(storeItemData);
      alert("Store Item updated successfully");
    } catch (error) {
      console.error("Error fetching stores Item:", error);
      alert("Error fetching store Item");
    }
  }

  async function deleteStoreItem(id: number): Promise<void> {
    try {
      await storeItemService.deleteStoreItem(id);
      const storeItemData = await storeItemService.getStoreItemByItemId(itemId);
      setStoreItem(storeItemData);
      alert("Store Item deleted successfully");
    } catch (error) {
      console.error("Error fetching stores Item:", error);
      alert("Error fetching stores Item");
    }
  }

  return (
    <div>
      <NavBar />
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Stores</h1>
        <CreateStoreItemForm onSave={addStoreItem} id={Number(itemId)} />
        <br />
        <DataTable
          columns={getColumnDefs({
            onEdit: editStoreItem,
            onDelete: deleteStoreItem,
          })}
          data={storeItem}
        />
      </section>
    </div>
  );
}

export default Test;
