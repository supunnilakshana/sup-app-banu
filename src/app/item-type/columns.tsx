"use client";

import { ItemTypeDto } from "@/dto";
import { ColumnDef } from "@tanstack/react-table";
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
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
                <Input id="name" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-red-800 text-white hover:bg-red-800 hover:text-white"
            >
              Delete
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
