"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type EmployeeColumn = {
    avatar_url: string;
    employee_id: string; // cam cước
    employee_name: string; // họ và tên
    birthday: string;
    gender: string;
    salary: string;
    position: string;
    create: string;
    work_status: boolean; // iss Archive = status
    address: string;
};

export const columns: ColumnDef<EmployeeColumn>[] = [
    {
        accessorKey: "avatar_url",
        header: "Avatar",
        cell: ({ row }) => (
            <Avatar className="h-9 w-9">
                <AvatarImage src={row.original.avatar_url} alt="Avatar" />
                <AvatarFallback>NO</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "employee_id",
        header: "ID",
    },
    {
        accessorKey: "employee_name",
        header: "Name",
    },
    {
        accessorKey: "birthday",
        header: "Birdthday",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    // {
    //   accessorKey: "salary",
    //   header: "Salary ($)",
    // },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "create",
        header: "Create",
    },
    {
        accessorKey: "work_status",
        header: "Status",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
