"use client";
import React, { useState, useEffect } from "react";
import { getColumnDefs } from "./column";
import ItemTypeService from "../../services/item_type_service";
import { DataTable } from "@/components/data-table";
import CreateItemTypeForm from "@/components/form/CreateItemTypeForm";
import NavBar from "@/components/navbar/NavBar";
import {
  CreateItemDto,
  CreateItemTypeDto,
  ItemTypeDto,
  UpdateItemTypeDto,
} from "@/dto";
import { number } from "zod";

const itemTypeService = new ItemTypeService();

function ItemType() {
  const [itemTypes, setItemTypes] = useState<ItemTypeDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemTypesData = await itemTypeService.getItemTypes();
        setItemTypes(itemTypesData);
      } catch (error) {
        console.error("Error fetching item types:", error);
      }
    }

    fetchData();
  }, []);

  async function addItemType(data: CreateItemTypeDto): Promise<void> {
    try {
      await itemTypeService.createItemType(data);
      const itemTypesData = await itemTypeService.getItemTypes();
      setItemTypes(itemTypesData);
      alert("Item type added successfully");
    } catch (error) {
      console.error("Error adding item types:", error);
      alert("Error adding item types");
    }
  }
  async function editItemType(
    data: UpdateItemTypeDto,
    id: number
  ): Promise<void> {
    try {
      await itemTypeService.updateItemType(data, id);
      const itemTypesData = await itemTypeService.getItemTypes();
      setItemTypes(itemTypesData);
    } catch (error) {
      console.error("Error updating item types:", error);
    }
  }

  async function deleteItemType(id: number): Promise<void> {
    try {
      await itemTypeService.deleteItemType(id);
      const itemTypesData = await itemTypeService.getItemTypes();
      setItemTypes(itemTypesData);
    } catch (error) {
      console.error("Error deleting item types:", error);
    }
  }

  return (
    <div>
      <NavBar />
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Items Types</h1>
        <CreateItemTypeForm onSave={addItemType} />
        <br />
        <br />
        <br />
        <DataTable
          columns={getColumnDefs({
            onEdit: editItemType,
            onDelete: deleteItemType,
          })}
          data={itemTypes}
        />
      </section>
    </div>
  );
}

export default ItemType;
