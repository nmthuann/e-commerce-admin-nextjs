"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/app/(dashboard)/customer/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";


// {
//         "avatar_url": "",
//         "customer_id": "4",
//         "customer_name": "Nguyen Trung",
//         "birthday": "7/28/2000",
//         "gender": "Nam",
//         "count_order": "2",
//         "total_price": "588",
//         "canceled": "1"
//     },

export type CustomerColumn = {
  avatar_url: string;
  customer_id: string // cam cước
  customer_name: string; // họ và tên
  birthday: string;
  gender: string
  count_order: string;
  total_price: string;
  canceled: string; // iss Archive = status
  address: string;
}

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "avatar_url",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar className="h-9 w-9">
          <AvatarImage src={row.original.avatar_url} alt="Avatar" />
          <AvatarFallback>NO</AvatarFallback>
        </Avatar>
    )
  },
  {
    accessorKey: "customer_id",
    header: "ID",
  },
  {
    accessorKey: "customer_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "birthday",
    header: "Birdthday",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "count_order",
    // header: "Orders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orders" />
    ),
  },
  {
    accessorKey: "total_price",
    //header: "Total ($)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total ($)" />
    ),
  },
  {
    accessorKey: "canceled",
    header: "Canceled",
  },
  {
    accessorKey: "address",
    header: "Address",
    
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
