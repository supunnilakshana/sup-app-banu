import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {StoreItemDto} from "@/dto";

interface ColumnsWithActionsProps {}

export const getColumnDefs =
  ({}: ColumnsWithActionsProps): ColumnDef<StoreItemDto>[] => {
    return [
      {
        accessorKey: "name",
        header: "Store Name",
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
  };
