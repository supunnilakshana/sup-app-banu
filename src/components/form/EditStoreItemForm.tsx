/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
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
import {
  ItemDto,
  ItemTypeDto,
  MeasurementDto,
  StoreDto,
  StoreItemDto,
  UpdateStoreItemDto,
} from "@/dto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import ItemTypeService from "@/services/item_type_service";
import MeasurementService from "@/services/measurement_service";
import { log } from "console";
import LoadingIndicator from "../loading/LoadingIndicator";
import StoreService from "@/services/store_service";

const FormSchema = z.object({
  price: z.string(),
  per_qty: z.string().min(0, "Price must be greater than or equal to 0"),
  discount: z.string(),
  store_id: z.string(),
});

const StoreItemForm: React.FC<ItemFormProps> = ({ onSave, item }) => {
  const [stores, setStore] = useState<StoreDto[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const storeData = await new StoreService().getStores();

        setStore(storeData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    }

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      price: item.price.toString(),
      per_qty: item.per_qty.toString(),
      discount: item.discount.toString(),
      store_id: item.store_id.toString(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    const updateStoreItemDto: UpdateStoreItemDto = {
      price: Number(data.price),
      per_qty: Number(data.per_qty),
      discount: Number(data.discount),
      item_id: item.item_id,
      store_id: Number(data.store_id),
    };
    console.log("updateStoreItemDto", updateStoreItemDto);
    await onSave(updateStoreItemDto, item.id);
  }
  return (
    <div>
      {" "}
      {isLoaded ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6  justify-center mx-auto my-8"
          >
            <FormField
              control={form.control}
              name="store_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Store" />
                      </SelectTrigger>
                      <SelectContent>
                        {stores.map((itemType) => (
                          <SelectItem
                            key={itemType.id}
                            value={itemType.id.toString()}
                          >
                            {itemType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="add price" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="per_qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Per Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="add quantity" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="add discount" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-green-800 text-white hover:bg-green-800 w-full"
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default StoreItemForm;

interface ItemFormProps {
  onSave: (data: UpdateStoreItemDto, id: number) => Promise<void>;
  item: StoreItemDto;
}
