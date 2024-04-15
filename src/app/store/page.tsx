"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import CreateStoreForm from "@/components/form/CreateStoreForm";
import { getColumnDefs } from "./column";
import { CreateStoreDto, StoreDto } from "@/dto";
import StoreService from "../../services/store_service";

const storeService = new StoreService();

function Item() {
  const [store, setStore] = useState<StoreDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storesData = await storeService.getStore();
        setStore(storesData);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    }

    fetchData();
  }, []);

  async function addStore(data: CreateStoreDto): Promise<void> {
    try {
      await storeService.createStore(data);
      const storesData = await storeService.getStore();
      setStore(storesData);
      alert("Store added successfully");
    } catch (error) {
      console.error("Error fetching store:", error);
      alert("Error fetching store ");
    }
  }

  return (
    <div>
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Items</h1>
        <CreateStoreForm onSave={addStore} />
        <DataTable columns={getColumnDefs} data={store} />
      </section>
    </div>
  );
}

export default Item;
