"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { StoreItemDto, UpdateStoreItemDto } from "@/dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { promises } from "dns";
import { FaTrash } from "react-icons/fa";

export type strItem = {
  id: string;
  store_item: string;
  category: string;
};

export const columns: ColumnDef<strItem>[] = [
  {
    accessorKey: "store_item",
    header: "Store Item",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-red-800 text-white hover:bg-red-800 hover:text-white"
            >
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[350px]">
            <DialogHeader>
              <DialogTitle className="text-center">Are You Sure !</DialogTitle>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-red-800 text-white hover:bg-red-800 hover:text-white"
                onClick={() => navigator.clipboard.writeText(item.id)}
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
