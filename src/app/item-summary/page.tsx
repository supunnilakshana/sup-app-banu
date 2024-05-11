"use client";
import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RiArrowDownSLine } from "react-icons/ri";
import { DataTable } from "@/components/data-table";
import { columns } from "./column";
import { StoreItemDto } from "@/dto";
import StoreItemService from "../../services/store_item_service";
import { useParams } from "next/navigation";

const storeItemService = new StoreItemService();

export default async function itemSummary() {
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
  return (
    <div>
      <div className="mx-32 mt-10 my-5">
        <Collapsible>
          <div className="border-2 shadow-md flex justify-between">
            <div>
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIfgiosVCwEUK5vFezHqU_Vzv_xd50zFbwlA&s"
                alt="Item Image"
                width={100}
                height={100}
                className="rounded-full mt-8 mx-10 my-5"
              />{" "}
            </div>
            <div>
              <h1 className="my-14">Item Name</h1>
            </div>
            <div>
              <h1 className="my-14">Item Category</h1>
            </div>

            <CollapsibleTrigger>
              <RiArrowDownSLine className=" flex float-right mx-10" />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="border-2 shadow-md mt-2 px-5 py-5">
              <DataTable columns={columns} data={storeItem} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="mx-32 mt-10 my-5">
        <Collapsible>
          <div className="border-2 shadow-md flex justify-between">
            <div>
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIfgiosVCwEUK5vFezHqU_Vzv_xd50zFbwlA&s"
                alt="Item Image"
                width={100}
                height={100}
                className="rounded-full mt-8 mx-10 my-5"
              />{" "}
            </div>
            <div>
              <h1 className="my-14">Item Name</h1>
            </div>
            <div>
              <h1 className="my-14">Item Category</h1>
            </div>

            <CollapsibleTrigger>
              <RiArrowDownSLine className=" flex float-right mx-10" />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="border-2 shadow-md mt-2 px-5 py-5">
              <DataTable columns={columns} data={storeItem} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
