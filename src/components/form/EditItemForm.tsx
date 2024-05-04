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
import { toast } from "@/components/ui/use-toast";
import { ItemDto, ItemTypeDto, MeasurementDto, UpdateItemDto } from "@/dto";
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

const FormSchema = z.object({
  name: z.string(),
  image: z.string(),
  typeId: z.string(),
  measurementId: z.string(),
});

const ItemForm: React.FC<ItemFormProps> = ({ onSave, item }) => {
  const [itemTypes, setItemTypes] = useState<ItemTypeDto[]>([]);
  const [measurement, setMeasurement] = useState<MeasurementDto[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemTypesData = await new ItemTypeService().getItemTypes();
        const measuremenTypes = await new MeasurementService().getMeasurement();
        setItemTypes(itemTypesData);
        setMeasurement(measuremenTypes);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching item types:", error);
      }
    }

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: item.name,
      image: item.image ?? "",
      typeId: item.type_id.toString(),
      measurementId: item.measurement_id.toString(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    const updateItemDto: UpdateItemDto = {
      name: data.name,
      type_id: Number(data.typeId),
      measurement_id: Number(data.measurementId),
      image: data.image,
    };
    console.log("updateItemDto", updateItemDto);
    await onSave(updateItemDto, selectedFile, item.id);
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
            {selectedFile != null ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Edit Item Image"
                width={100}
                height={100}
                className="rounded-full flex mx-auto justify-center mt-8"
              />
            ) : item.image ? (
              <img
                src={item.image}
                alt="Edit Item Image"
                width={100}
                height={100}
                className="rounded-full flex mx-auto justify-center mt-8"
              />
            ) : null}

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      className=" flex mx-auto justify-center mt-8"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          form.setValue("image", file.name);
                        }
                      }}
                      placeholder="add item image"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                        {itemTypes.map((itemType) => (
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
              name="measurementId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Measurement</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Item Measurement" />
                      </SelectTrigger>
                      <SelectContent>
                        {measurement.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
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
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default ItemForm;

interface ItemFormProps {
  onSave: (data: UpdateItemDto, file: File | null, id: number) => Promise<void>;
  item: ItemDto;
}
