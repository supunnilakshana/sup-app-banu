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
import { CreateItemTypeDto } from "@/dto";

const FormSchema = z.object({
  item_type: z.string().min(2, {
    message: "Item_type must be at least 2 characters.",
  }),
});

const ItemTypeForm: React.FC<ItemTypeFormProps> = ({ onSave }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      item_type: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    await onSave({ name: data.item_type });
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
            name="item_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Type</FormLabel>
                <FormControl>
                  <Input placeholder="add item type" {...field} />
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
    </div>
  );
};

export default ItemTypeForm;

interface ItemTypeFormProps {
  onSave: (data: CreateItemTypeDto) => Promise<void>;
}
