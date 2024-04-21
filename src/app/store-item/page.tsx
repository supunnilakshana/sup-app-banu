import React from "react";
import NavBar from "@/components/navbar/NavBar";
import { DataTable } from "@/components/store-item-data-table";
import { columns, strItem } from "./column";

async function getData(): Promise<strItem[]> {
  return [
    {
      id: "728ed52f",
      store_item: "beans",
      category: "vegitable",
    },
    {
      id: "728ed528",
      store_item: "aaaaaaaaaaa",
      category: "vegitable",
    },
    {
      id: "728ed529",
      store_item: "cccccccccccccc",
      category: "vegitable",
    },
    {
      id: "728ed59f",
      store_item: "beansddddddddddddd",
      category: "vegitable",
    },
  ];
}

export default async function StoreItem() {
  const data = await getData();
  return (
    <div>
      <NavBar />
      <section className="py-24 px-20">
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  );
}
