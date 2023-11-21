import { Metadata } from "next";

import { columns } from "@/app/(dashboard)/task/components/coloumns";
import { DataTable } from "./components/data-table";
import { GetTaskOrders } from "@/actions/order/get-task-order";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
    const tasks = await GetTaskOrders();
    return (
        <>
            {/* max-h-full h-full */}
            <div className="hidden flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Quản lý đơn hàng
                        </h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger></TooltipTrigger>
                                <TooltipContent>
                                    <p>Add New Order</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    );
}
