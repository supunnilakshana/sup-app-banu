"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import CreateStoreForm from "@/components/form/CreateStoreForm";
import { getColumnDefs } from "./column";
import { CreateStoreDto, StoreDto, UpdateStoreDto } from "@/dto";
import StoreService from "../../services/store_service";
import NavBar from "@/components/navbar/NavBar";

const storeService = new StoreService();

function Item() {
  const [store, setStore] = useState<StoreDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storesData = await storeService.getStores();
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
      const storesData = await storeService.getStores();
      setStore(storesData);
      alert("Store added successfully");
    } catch (error) {
      console.error("Error adding store:", error);
    }
  }

  async function editStore(data: UpdateStoreDto, id: number): Promise<void> {
    try {
      await storeService.updateStore(data, id);
      const storeData = await storeService.getStores();
      setStore(storeData);
    } catch (error) {
      console.error("Error updating stores:", error);
    }
  }

  async function deleteStore(id: number): Promise<void> {
    try {
      await storeService.deleteStore(id);
      const storeData = await storeService.getStores();
      setStore(storeData);
    } catch (error) {
      console.error("Error deleting stores:", error);
    }
  }

  return (
    <div>
      <NavBar />
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Stores</h1>
        <CreateStoreForm onSave={addStore} />
        <br />
        <DataTable
          columns={getColumnDefs({
            onEdit: editStore,
            onDelete: deleteStore,
          })}
          data={store}
        />
      </section>
    </div>
  );
}

export default Item;
