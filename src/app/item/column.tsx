import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ItemDto, UpdateItemDto} from "@/dto";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {promises} from "dns";
import EditItemForm from "@/components/form/EditItemForm";
import {FaTrash} from "react-icons/fa";
import EditableRow from "./editable-row";

interface ColumnsWithActionsProps {
  onEdit: (data: UpdateItemDto, file: File | null, id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const getColumnDefs = ({
  onEdit,
  onDelete,
}: ColumnsWithActionsProps): ColumnDef<ItemDto>[] => {
  return [
    {
      accessorKey: "image",
      header: "Item Image",
      cell: ({row}) => {
        const imgUrl =
          row.getValue("image") ??
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUrl as string} // Cast imgUrl to string
            alt="item image"
            className="h-10 w-10 rounded-full"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Item Name",
    },
    {
      accessorKey: "type.name",
      header: "Item Type",
    },
    {
      accessorKey: "measurement.name",
      header: "Item Measurement",
    },

    {
      accessorKey: "created_at",
      header: "Created Date",
      cell: ({row}) => {
        const date = new Date(row.getValue("created_at"));
        const formatted = date.toLocaleDateString();
        return <div className="">{formatted}</div>;
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated Date",
      cell: ({row}) => {
        const date = new Date(row.getValue("updated_at"));
        const formatted = date.toLocaleDateString();
        return <div className="">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({row}) => {
        const item = row.original;

        const handleEditClick = () => {
          // onEdit(item,item.id);
          console.log(item.id);
        };
        let val: String = item.name;

        return <EditableRow onEdit={onEdit} item={item} />;
      },
    },
    {
      id: "actions",
      cell: ({row}) => {
        const item = row.original;

        const handleDeleteClick = () => {
          onDelete(item.id);
        };

        return (
          <Dialog>
            <DialogTrigger asChild>
              <FaTrash className=" text-red-800 outline-none  hover:text-red-800" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Are You Sure !
                </DialogTitle>
              </DialogHeader>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-red-800 text-white hover:bg-red-800 hover:text-white"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
};
