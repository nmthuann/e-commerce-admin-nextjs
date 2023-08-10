"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type DiscountColumn = {
  discount_id: string;
  description: string;
  expired: string;
  percent: number;
}

export const columns: ColumnDef<DiscountColumn>[] = [
  {
    accessorKey: "discount_id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "expired",
    header: "Expired",
  },
  {
    accessorKey: "percent",
    header: "Percent %",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];