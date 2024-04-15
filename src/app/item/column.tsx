import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ItemDto } from "@/dto";
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

export const getColumnDefs: ColumnDef<ItemDto>[] = [
  {
    accessorKey: "name",
    header: "Item Name",
  },
  {
    accessorKey: "image",
    header: "Item Image",
  },
  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = date.toLocaleDateString();
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
      const formatted = date.toLocaleDateString();
      return <div className="">{formatted}</div>;
    },
  },
];
