"use client";

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
import { toast } from "@/components/ui/use-toast";
import { CreateStoreItemDto } from "@/dto";
import { disconnect } from "process";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Store Item Name must be at least 2 characters.",
  }),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  per_qty: z.number().min(0, "Price must be greater than or equal to 0"),
  discount: z.number().min(0, "Price must be greater than or equal to 0"),
  store_id: z.number().min(0, "Price must be greater than or equal to 0"),
  item_id: z.number().min(0, "Price must be greater than or equal to 0"),
});

const StoreForm: React.FC<StoreItemFormProps> = ({ onSave }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
      discount: 0,
      per_qty: 1,
      store_id: 0,
      item_id: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    await onSave({
      name: data.name,
      price: data.price,
      discount: data.discount,
      per_qty: data.per_qty,
      store_id: data.store_id,
      item_id: data.item_id,
    });
    form.reset();
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="add store name" {...field} />
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
          <FormField
            control={form.control}
            name="store_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Id</FormLabel>
                <FormControl>
                  <Input placeholder="add StoreId" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="item_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Id</FormLabel>
                <FormControl>
                  <Input placeholder="add item id" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-green-800 text-white float-right w-2/5"
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
  onSave: (data: CreateStoreItemDto) => Promise<void>;
}
