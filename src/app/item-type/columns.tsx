"use client";

import { ItemTypeDto } from "@/dto";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns: ColumnDef<ItemTypeDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
  },
  //   {
  //     accessorKey: "delete",
  //     header: "Delete",
  //   },
  //   {
  //     accessorKey: "update",
  //     header: "Update",
  //   },
];
