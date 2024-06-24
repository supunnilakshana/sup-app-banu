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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const storeItemService = new StoreItemService();
const itemService = new ItemService();

const FormSchema = z.object({
  typeId: z.string(),
});

export default function ItemSummary() {
  const [items, setItems] = useState<ItemWSIDto[]>([]);
  const [filterItem, setFilterItem] = useState<ItemDto[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterItem(filteredItems);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsData: ItemWSIDto[] =
          await itemService.getItemsWithStoreItems();
        setItems(itemsData);
        setFilterItem(itemsData);
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
      <div className="mt-10 mx-10 flex">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="border-2 p-1 w-1/4 h-1/4"
        />

        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/3 space-y-6  justify-center mx-auto my-8"
          >
            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Item Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-green-800 text-white hover:bg-green-800   w-full"
            >
              Find
            </Button>
          </form>
        </Form>
      </div>

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
