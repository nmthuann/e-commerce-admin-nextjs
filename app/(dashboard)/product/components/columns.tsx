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
    is_discount: boolean; // status // isFeatured
    status: boolean; // iss Archive = status

    color: string;
    battery: number;
    screen: number;
    memory: number;
    front_camera: number;
    behind_camera: number;
    ram: number;
};

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "product_id",
        header: "ID",
    },
    {
        accessorKey: "model_name",
        header: "Name",
    },
    {
        accessorKey: "vote",
        header: "Vote",
    },
    {
        accessorKey: "status",
        header: "Trạng Thái",
    },
    {
        accessorKey: "is_discount",
        header: "Giảm giá",
    },
    {
        accessorKey: "price",
        header: "Giá Bán (đ)",
    },
    {
        accessorKey: "unit_price",
        header: "Giá Nhập (đ)",
    },
    {
        accessorKey: "category",
        header: "Hãng",
    },
    {
        accessorKey: "operation_system",
        header: "OS",
    },
    {
        accessorKey: "hardware",
        header: "Hardware",
    },
    {
        accessorKey: "warranty_time",
        header: "Bảo Hàng",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
