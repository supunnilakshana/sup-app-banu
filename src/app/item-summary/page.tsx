"use client";
import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RiArrowDownSLine } from "react-icons/ri";
import { DataTable } from "@/components/data-table";

import { ItemDto, ItemWSIDto, StoreItemDto } from "@/dto";
import StoreItemService from "../../services/store_item_service";
import { useParams } from "next/navigation";
import ItemService from "@/services/item_service";
import { getColumnDefs } from "./column";

const storeItemService = new StoreItemService();
const itemService = new ItemService();

export default function ItemSummary() {
  const [items, setItems] = useState<ItemWSIDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsData: ItemWSIDto[] =
          await itemService.getItemsWithStoreItems();
        setItems(itemsData);
        itemsData.forEach((item) => {
          console.log("Log", item.store_items);
          console.log(item.store_items);
        });
      } catch (error) {
        console.error("Error fetching store items:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      {items.map((item) => (
        <>
          <div className="mx-32 mt-10 my-5">
            <Collapsible>
              <div className="border-2 shadow-md flex justify-between">
                <div>
                  {" "}
                  <img
                    src={item.image ?? "lorempixel.com/100/100"}
                    alt="Item Image"
                    width={50}
                    height={50}
                    className=""
                  />{" "}
                </div>
                <div className="flex items-center">
                  <h1 className="">{item.name}</h1>
                </div>
                <div className="flex items-center">
                  <h1 className="">{item.type.name}</h1>
                </div>

                <CollapsibleTrigger>
                  <RiArrowDownSLine className=" flex float-right mx-10 bg-blue-800 text-2xl rounded-full text-white" />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="border-2 shadow-md mt-2 px-5 py-5">
                  <DataTable
                    columns={getColumnDefs({})}
                    data={item.store_items ?? []}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </>
      ))}
    </div>
  );
}
