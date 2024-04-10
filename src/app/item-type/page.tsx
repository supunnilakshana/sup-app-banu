"use client";
import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import ItemTypeService from "../../services/item_type_service";
import { DataTable } from "@/components/data-table";
import CreateItemTypeForm from "@/components/form/CreateItemTypeForm";
import { ItemTypeDto } from "@/dto";

const itemTypeService = new ItemTypeService();

function itemType() {
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

  return (
    <div>
      <section className="py-24 px-20">
        <h1 className="text-blue-800 text-xl font-semibold">All Items Types</h1>
        <CreateItemTypeForm />
        <br />
        <br />
        <br />
        <DataTable columns={columns} data={itemTypes} />
      </section>
    </div>
  );
}

export default itemType;
