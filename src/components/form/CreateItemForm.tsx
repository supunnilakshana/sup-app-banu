"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import {CreateItemDto, ItemTypeDto, MeasurementDto} from "@/dto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useEffect, useState} from "react";
import ItemTypeService from "@/services/item_type_service";
import MeasurementService from "@/services/measurement_service";
import {log} from "console";

const FormSchema = z.object({
  name: z.string(),
  image: z.string(),
  typeId: z.string(),
  measurementId: z.string(),
});

const ItemForm: React.FC<ItemFormProps> = ({onSave}) => {
  const [itemTypes, setItemTypes] = useState<ItemTypeDto[]>([]);
  const [measurement, setMeasurement] = useState<MeasurementDto[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemTypesData = await new ItemTypeService().getItemTypes();
        const measuremenTypes = await new MeasurementService().getMeasurement();
        setItemTypes(itemTypesData);
        setMeasurement(measuremenTypes);
      } catch (error) {
        console.error("Error fetching item types:", error);
      }
    }

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      image: "",
      typeId: "",
      measurementId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    const createItemDto: CreateItemDto = {
      name: data.name,
      type_id: Number(data.typeId),
      measurement_id: Number(data.measurementId),
      image: data.image,
    };
    console.log("createItemDto", createItemDto);
    await onSave(createItemDto, selectedFile);
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
            name="image"
            render={({field}) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
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
            render={({field}) => (
              <FormItem>
                <FormLabel>Item Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
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
            render={({field}) => (
              <FormItem>
                <FormLabel>Measurement</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
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
            render={({field}) => (
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
            className="bg-green-800 text-white float-right w-2/5"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ItemForm;

interface ItemFormProps {
  onSave: (data: CreateItemDto, file: File | null) => Promise<void>;
}
