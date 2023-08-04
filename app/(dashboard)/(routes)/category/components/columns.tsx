"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CategoryColumn = {
  category_id: number;
  category_name: string;
  description: string;
  //createdAt: Date;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "category_id",
    header: "ID",
    //cell: ({ row }) => row.original.category_id,
  },
  {
    accessorKey: "category_name",
    header: "Name",
    cell: ({ row }) => row.original.category_name,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];