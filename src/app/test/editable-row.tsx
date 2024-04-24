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

interface EditableRowProps {
  onEdit: (updateStoreItem: UpdateStoreItemDto, id: number) => Promise<void>;
  item: StoreItemDto;
}

const EditableRow: React.FC<EditableRowProps> = ({ onEdit, item }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState<number>(item.price);
  const [perQuantity, setPerQuantity] = useState<number>(item.price);
  const [discount, setDiscount] = useState<number>(item.discount);
  const [storeId, setStoreId] = useState<number>(item.store_id);
  const [ItemId, setItemId] = useState<number>(item.item_id);

  const handleEditClick = () => {
    console.log(item.id);
    onEdit(
      {
        name: name,
        price: price,
        per_qty: perQuantity,
        discount: discount,
        store_id: storeId,
        item_id: ItemId,
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
              Item Type
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Item Price
            </Label>
            <Input
              id="price"
              className="col-span-3"
              value={price}
              //   onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discount" className="text-right">
              Item Discount
            </Label>
            <Input
              id="discount"
              type="number"
              className="col-span-3"
              value={discount}
              //   onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Per Quantity
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={perQuantity}
              //   onChange={(e) => setPerQuantity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Store Id
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={storeId}
              //   onChange={(e) => setStoreId(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Item Id
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={ItemId}
              //   onChange={(e) => setItemId(e.target.value)}
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
