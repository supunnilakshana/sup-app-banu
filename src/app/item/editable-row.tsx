import React, {useState} from "react";
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
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {FaEdit} from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Edit} from "lucide-react";
import EditItemForm from "@/components/form/EditItemForm";

interface EditableRowProps {
  onEdit: (data: UpdateItemDto, file: File | null, id: number) => Promise<void>;
  item: ItemDto;
}

const EditableRow: React.FC<EditableRowProps> = ({onEdit, item}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaEdit className="text-green-800 outline-none hover:text-green-800 " />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <EditItemForm onSave={onEdit} item={item} />
      </DialogContent>
    </Dialog>
  );
};

export default EditableRow;
