"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
    product_id: string;
    model_name: string;
    category: string;
    vote: string;
    price: string;
    unit_price: string;
    quantity: string;
    operation_system: string; // brandsize
    hardware: string; // color: string,
    warranty_time: string;
    isDiscount: boolean; // status // isFeatured
    isStatus: boolean; // iss Archive = status
};

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "model_name",
        header: "Name",
    },
    {
        accessorKey: "vote",
        header: "Vote",
    },
    {
        accessorKey: "isStatus",
        header: "Status",
    },
    {
        accessorKey: "isDiscount",
        header: "Discount",
    },
    {
        accessorKey: "price",
        header: "Price (đ)",
    },
    {
        accessorKey: "unit_price",
        header: "Unit Price (đ)",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "operation_system",
        header: "OS",
    },
    {
        accessorKey: "hardware",
        header: "Hardware",
        // cell: ({ row }) => (
        //   <div className="flex items-center gap-x-2">
        //     {row.original.color}
        //     <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
        //   </div>
        // )
    },
    {
        accessorKey: "warranty_time",
        header: "Warranty (m)",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
