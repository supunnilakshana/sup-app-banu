import React, { useState } from 'react';
import { ItemTypeDto, UpdateItemTypeDto } from "@/dto";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditableRowProps {
onEdit: ( updateItem:UpdateItemTypeDto,id: number,) => Promise<void>;
  item: ItemTypeDto;
 
}

const EditableRow: React.FC<EditableRowProps> = ({  onEdit,item }) => {
  const [name, setName] = useState(item.name);

  const handleEditClick = () => {
  
      console.log(item.id);
      onEdit({
        name: name,
     },item.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-800 text-white hover:bg-green-800 hover:text-white"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Type
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
