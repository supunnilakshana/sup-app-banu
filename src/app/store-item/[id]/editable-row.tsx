import React, { useState } from "react";
import { StoreItemDto, UpdateStoreItemDto } from "@/dto";
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
import EditStoreItemForm from "@/components/form/EditStoreItemForm";

interface EditableRowProps {
  onEdit: (updateStoreItem: UpdateStoreItemDto, id: number) => Promise<void>;
  item: StoreItemDto;
}

const EditableRow: React.FC<EditableRowProps> = ({ onEdit, item }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaEdit className="text-green-800 outline-none hover:text-green-800 " />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <EditStoreItemForm onSave={onEdit} item={item} />
      </DialogContent>
    </Dialog>
  );
};

export default EditableRow;
