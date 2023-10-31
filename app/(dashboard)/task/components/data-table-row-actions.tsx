"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "../data/data";
import { taskSchema } from "../data/schema";
import { ITask } from "@/types/task.interface";
import axios from "axios";
import toast from "react-hot-toast";
import { Messages, RequestMessage } from "@/constants/notifications/message";
import { MiddlewareError, OrderError } from "@/constants/errors/errors";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/constants/enums/order-status.enum";
import { useAppSelector } from "@/redux/hook";
import { Position } from "@/constants/enums/positon.enum";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const task = row.original as ITask;
    const router = useRouter();
    const admin = useAppSelector((state) => state.auth.currentAdmin);

    //  PENDING -> CONFIRMED
    async function handleConfirmedOrder() {
        if (task.status === OrderStatus.Confirmed) {
            toast.success(OrderError.CONFIRMED_ORDER_FAILED);
            return;
        }
        if (task.status === OrderStatus.Canceled) {
            toast.error(OrderError.CONFIRMED_FOR_CANCELED_ORDER);
            return;
        }
        if (task.status === OrderStatus.InProgress) {
            toast.error(OrderError.INPROGRESS_FOR_CONFIRMED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Completed) {
            toast.error(OrderError.CANCELED_FOR_CONFIRMED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Refunded) {
            toast.error(OrderError.REFUNDED_FOR_CONFIRMED_ORDER);
            return;
        }
        try {
            const res = await axios.post("api/task/confirm", {
                order_id: task.id,
            });
            if (res.data.message === MiddlewareError.TOKEN_MISSING) {
                toast.error(MiddlewareError.TOKEN_MISSING);
                setTimeout(() => {
                    router.push("auth/login");
                    toast.success(RequestMessage.REQUEST_LOGIN);
                }, 2000);
            }
            if (res.data.message) {
                toast.error(res.data.message);
                return;
            }
            router.refresh();
            toast.success(Messages.CONFIRMED_SUCCESS);
        } catch (error) {
            console.log(error);
            toast.error(OrderError.UPDATE_STATUS_ORDER_FAILED);
        }
    }

    //  PENDING -> CANCELED
    async function handleCanceledOrder() {
        if (task.status === OrderStatus.Confirmed) {
            toast.success(OrderError.CANCELED_FOR_CONFIRMED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Canceled) {
            toast.error(OrderError.CANCELED_ORDER_DUPLICATE);
            return;
        }
        if (task.status === OrderStatus.InProgress) {
            toast.error(OrderError.INPROGRESS_FOR_CANCELED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Completed) {
            toast.error(OrderError.CANCELED_ORDER_NOT_UPDATE);
            return;
        }
        if (task.status === OrderStatus.Refunded) {
            toast.error(OrderError.CANCELED_ORDER_NOT_UPDATE);
            return;
        }
        try {
            const res = await axios.post("api/task/cancel", {
                order_id: task.id,
            });
            if (res.data.message === MiddlewareError.TOKEN_MISSING) {
                toast.error(MiddlewareError.TOKEN_MISSING);
                setTimeout(() => {
                    router.push("auth/login");
                    toast.success(RequestMessage.REQUEST_LOGIN);
                }, 2000);
            }
            if (res.data.message) {
                toast.error(res.data.message);
                return;
            }
            router.refresh();
            toast.success(Messages.CANCELED_SUCCESS);
        } catch (error) {
            console.log(error);
            toast.error(OrderError.UPDATE_STATUS_ORDER_FAILED);
        }
    }

    //  CONFIRMED -> INPROGRESS (button)
    async function handleInProgressOrder() {
        if (task.status === OrderStatus.Pending) {
            toast.error(OrderError.NOT_YET_CONFIRM);
            return;
        }
        if (task.status === OrderStatus.Canceled) {
            toast.error(OrderError.CANCELED_ORDER_DUPLICATE);
            return;
        }
        if (task.status === OrderStatus.InProgress) {
            toast.success(Messages.INPROGRESS_SUCCESS);
            return;
        }
        if (task.status === OrderStatus.Completed) {
            toast.error(OrderError.COMPLETED_FOR_INPROGRESS_ORDER);
            return;
        }
        if (task.status === OrderStatus.Refunded) {
            toast.error(OrderError.COMPLETED_FOR_INPROGRESS_ORDER);
            return;
        }
        try {
            const res = await axios.post("api/task/inprogress", {
                order_id: task.id,
            });
            if (res.data.message === MiddlewareError.TOKEN_MISSING) {
                toast.error(MiddlewareError.TOKEN_MISSING);
                setTimeout(() => {
                    router.push("auth/login");
                    toast.success(RequestMessage.REQUEST_LOGIN);
                }, 2000);
            }
            if (res.data.message) {
                toast.error(res.data.message);
                return;
            }
            router.refresh();
            toast.success(Messages.INPROGRESS_SUCCESS);
        } catch (error) {
            console.log(error);
            toast.error(OrderError.UPDATE_STATUS_ORDER_FAILED);
        }
    }

    //  INPROGRESS -> COMPLETED (button)
    async function handleCompletedOrder() {
        if (task.status === OrderStatus.Completed) {
            toast.success(OrderError.COMPLETED_ORDER_FAILED);
            return;
        }
        if (task.status === OrderStatus.Refunded) {
            toast.success(OrderError.REFUNDED_ORDER_FAILED);
            return;
        }
        if (
            task.status === OrderStatus.Confirmed ||
            task.status === OrderStatus.Canceled
        ) {
            toast.error(OrderError.CONFIRMED_FOR_COMPLETED_ORDER);
            return;
        }
        try {
            const res = await axios.post("api/task/complete", {
                order_id: task.id,
            });
            if (res.data.message === MiddlewareError.TOKEN_MISSING) {
                toast.error(MiddlewareError.TOKEN_MISSING);
                setTimeout(() => {
                    router.push("auth/login");
                    toast.success(RequestMessage.REQUEST_LOGIN);
                }, 2000);
            }
            if (res.data.message) {
                toast.error(res.data.message);
                return;
            }
            router.refresh();
            toast.success(Messages.COMPLETED_SUCCESS);
        } catch (error) {
            console.log(error);
            toast.error(OrderError.UPDATE_STATUS_ORDER_FAILED);
        }
    }

    //  INPROGRESS -> REFUNDED (button)
    async function handleRefundedOrder() {
        if (task.status === OrderStatus.Completed) {
            toast.success(OrderError.COMPLETED_ORDER_FAILED);
            return;
        }
        if (task.status === OrderStatus.Refunded) {
            toast.success(OrderError.REFUNDED_ORDER_FAILED);
            return;
        }
        if (
            task.status === OrderStatus.Confirmed ||
            task.status === OrderStatus.Canceled
        ) {
            toast.error(OrderError.CONFIRMED_FOR_COMPLETED_ORDER);
            return;
        }
        try {
            const res = await axios.post("api/task/refund", {
                order_id: task.id,
            });
            if (res.data.message === MiddlewareError.TOKEN_MISSING) {
                toast.error(MiddlewareError.TOKEN_MISSING);
                setTimeout(() => {
                    router.push("auth/login");
                    toast.success(RequestMessage.REQUEST_LOGIN);
                }, 2000);
            }
            if (res.data.message) {
                toast.error(res.data.message);
                return;
            }
            router.refresh();
            toast.success(Messages.REFUNDED_SUCCESS);
        } catch (error) {
            console.log(error);
            toast.error(OrderError.UPDATE_STATUS_ORDER_FAILED);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {(admin?.position === Position.STORE_MANAGER ||
                    admin?.position === Position.SELLER) && (
                    <>
                        <DropdownMenuItem onClick={handleConfirmedOrder}>
                            Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCanceledOrder}>
                            Cancel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleInProgressOrder}>
                            In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCompletedOrder}>
                            Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleRefundedOrder}>
                            Refunded
                        </DropdownMenuItem>
                    </>
                )}
                {admin?.position === Position.SELLER && (
                    <>
                        <DropdownMenuItem onClick={handleConfirmedOrder}>
                            Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCanceledOrder}>
                            Cancel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleInProgressOrder}>
                            In Progress
                        </DropdownMenuItem>
                    </>
                )}
                {admin?.position === Position.SHIPPER && (
                    <>
                        <DropdownMenuItem onClick={() => {}}>
                            Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                            Refunded
                        </DropdownMenuItem>
                    </>
                )}
                {admin?.position === Position.WAREHOUSE && <></>}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Method</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={task.label}>
                            {labels.map((label) => (
                                <DropdownMenuRadioItem
                                    key={label.value}
                                    value={label.value}
                                >
                                    {label.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        console.log("on click Order Detail");
                    }}
                >
                    Order Detail
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// {/* <DropdownMenuItem onClick={handleConfirmedOrder}>
//                     Confirm
//                 </DropdownMenuItem>
//                 {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}
//                 <DropdownMenuItem onClick={handleCanceledOrder}>
//                     Cancel
//                 </DropdownMenuItem> */}
