"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "@/app/(dashboard)/task/data/data";

import { Task } from "../data/schema";

import { DataTableColumnHeader } from "./data-table-column-header";

import { DataTableRowActions } from "./data-table-row-actions";
import { ITask } from "@/types/task.interface";
import { MapPin } from "lucide-react";
import { OrderStatus } from "@/constants/enums/order-status.enum";

export const columns: ColumnDef<ITask>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Information" />
        ),
        cell: ({ row }) => {
            const label = labels.find(
                (label) => label.value === row.original.label
            );

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[400px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "employee",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Employee" />
        ),
    },
    {
        accessorKey: "total_price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total (đ)" />
        ),
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            );

            if (!status) {
                return null;
            } else {
                return (
                    // <div className="flex w-[100px] items-center">
                    <div
                        className={
                            row.getValue("status") === OrderStatus.Pending
                                ? "bg-pink-400 p-2 rounded-lg"
                                : row.getValue("status") ===
                                  OrderStatus.Confirmed
                                ? "bg-blue-400 p-2 rounded-lg"
                                : row.getValue("status") ===
                                  OrderStatus.Canceled
                                ? "bg-red-400 p-2 rounded-lg"
                                : row.getValue("status") ===
                                  OrderStatus.InProgress
                                ? "bg-yellow-500 p-3 rounded-lg"
                                : row.getValue("status") ===
                                  OrderStatus.Completed
                                ? "bg-green-400 p-2 rounded-lg"
                                : row.getValue("status") ===
                                  OrderStatus.Refunded
                                ? "bg-purple-400 p-2 rounded-lg"
                                : "flex w-[100px] items-center"
                        }
                    >
                        {status.icon && (
                            <div className="flex w-[100px] items-center">
                                <status.icon className="mr-2 h-4 w-4 text-gray-200" />
                                {/* className="mr-2 h-4 w-4 text-muted-foreground" */}
                                <span className="text-gray-200">
                                    {status.label}
                                </span>
                            </div>
                        )}
                    </div>
                );
            }
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shipping" />
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority")
            );

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "create",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Create Date" />
        ),
    },
    {
        accessorKey: "delivery_address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Delivery" />
        ),
        cell: ({ row }) => {
            return (
                <div>
                    <span>
                        {row.getValue("delivery_address")}{" "}
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
