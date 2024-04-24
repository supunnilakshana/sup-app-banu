import React, { useState } from "react";
import {
  ItemDto,
  ItemTypeDto,
  UpdateItemDto,
  UpdateItemTypeDto,
  UpdateMeasurementDto,
} from "@/dto";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";

interface EditableRowProps {
  onEdit: (updateItem: UpdateItemDto, id: number) => Promise<void>;
  item: ItemDto;
}

const EditableRow: React.FC<EditableRowProps> = ({ onEdit, item }) => {
  const [name, setName] = useState(item.name);
  const [type, setType] = useState(item.type_id);
  const [image, setImage] = useState(item.image);
  const [measurement, setMeasurement] = useState(item.measurement_id);

  const handleEditClick = () => {
    console.log(item.id);
    onEdit(
      {
        name: name,
        type_id: type,
        image: image,
        measurement_id: measurement,
      },
      item.id
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaEdit className="text-green-800 outline-none hover:text-green-800 " />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Image
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.value)}
              placeholder="add item image"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Type
            </Label>
            {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Item Type" />
              </SelectTrigger>
              <SelectContent>
                {itemTypes.map((itemType) => (
                  <SelectItem key={itemType.id} value={itemType.id.toString()}>
                    {itemType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEditClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditableRow;
