import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { StoreItemDto } from "@/dto";

export const columns: ColumnDef<StoreItemDto>[] = [
  {
    accessorKey: "name",
    header: "   Store Name",
  },

  {
    accessorKey: "per_qty",
    header: "Per Quantity",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
