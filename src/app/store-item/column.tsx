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
import Link from "next/link";

interface ColumnsWithActionsProps {}

export const getColumnDefs =
  ({}: ColumnsWithActionsProps): ColumnDef<ItemDto>[] => {
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
        id: "actions",
        cell: ({row}) => {
          const item = row.original;

          return (
            <Link
              href={{
                pathname: `/store-item/${item.id}`,
              }}
            >
              <Button className="bg-red-800 text-white hover:bg-red-800 hover:text-white">
                View
              </Button>
            </Link>
          );
        },
      },
    ];
  };
