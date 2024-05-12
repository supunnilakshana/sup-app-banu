"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "@/components/ui/use-toast";
import { CreateStoreItemDto, StoreDto } from "@/dto";
import { disconnect } from "process";
import { useEffect, useState } from "react";
import StoreService from "@/services/store_service";

const FormSchema = z.object({
  price: z.string(),
  per_qty: z.string().min(0, "Price must be greater than or equal to 0"),
  discount: z.string(),
  store_id: z.string().min(2, "please select store"),
});

const StoreForm: React.FC<StoreItemFormProps> = ({ onSave, id }) => {
  const [stores, setStores] = useState<StoreDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storesData = await new StoreService().getStores();
        setStores(storesData);
      } catch (error) {
        console.error("Error fetching item types:", error);
      }
    }

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discount: "0",
      per_qty: "1",
      store_id: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    await onSave({
      price: Number(data.price),
      discount: Number(data.discount),
      per_qty: Number(data.per_qty),
      item_id: id,
      store_id: Number(data.store_id),
    });
    form.reset();
  }
  return (
    <div className="border-2 w-2/3 flex mx-auto d-block">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-6  justify-center mx-auto my-8"
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
            className="bg-green-800 text-white hover:bg-green-800  w-full"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StoreForm;

interface StoreItemFormProps {
  id: number;
  onSave: (data: CreateStoreItemDto) => Promise<void>;
}
