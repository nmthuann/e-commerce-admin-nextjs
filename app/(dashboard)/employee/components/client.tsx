"use client";
import React, { useState } from "react";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { EmployeeColumn, columns } from "./columns";
import EmployeeDialog from "./employee-dialog"; // Import the new EmployeeDialog component

interface EmployeesClientProps {
    data: EmployeeColumn[];
}

export const EmployeesClient: React.FC<EmployeesClientProps> = ({ data }) => {
    const [isDialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Employees (${data.length})`}
                    description="Manage Employees for your store"
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>
                                <EmployeeDialog
                                    onClose={() => {
                                        setDialogOpen(false);
                                    }}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Create Account for Employee</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Separator />
            <DataTable
                searchKey="employee_name"
                columns={columns}
                data={data}
            />
            {/* Render the EmployeeDialog component when the dialog is open */}

            {/* routers={orgin} */}
            <ApiList entityName="employee" entityIdName="employee_id" />
            {/* Rest of the code */}
        </>
    );
};
