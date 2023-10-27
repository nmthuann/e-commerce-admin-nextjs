// "use client";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ITask } from "@/types/task.interface";

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
    //const data = await GetTaskOrders();
    // const tasks = await GetTaskOrders();
    // const [tasks, setTasks] = useState<ITask[]>([]);
    // const router = useRouter();

    // useEffect(() => {
    //     GetData();
    // }, []);

    // const GetData = async () => {
    //     // getGraphRevenue()
    //     // .then(res => setGraphRevenue(res))
    //     // setGraphRevenue(graphRevenueRes);
    //     // const totalRevenueRes = await GetTotalRevenue();
    //     // setTotalRevenue(totalRevenueRes)
    //     const task = await GetTaskOrders();
    //     setTasks(task);
    //     // const productInStockRes = await CounttProductSold();
    //     // setProductInStock(productInStockRes)
    // };

    // // console.log(tasks);
    const tasks = await GetTaskOrders();
    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
                                <TooltipTrigger>
                                    {/* Hover */}
                                    {/* <Button
                                    // onClick={() =>
                                    //     router.push(`/order/create`)
                                    // }
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add
                                        New
                                    </Button> */}
                                </TooltipTrigger>
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
