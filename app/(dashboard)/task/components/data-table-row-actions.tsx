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
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { useState } from "react";
// import OrderDetailSheet from "./order-detail-sheet";
import {
    CheckCircle2,
    PackageCheck,
    Rocket,
    Undo2,
    WalletCards,
    XCircle,
} from "lucide-react";

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
            toast.error(OrderError.COMPLETED_FOR_CONFIRMED_ORDER);
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
        if (task.status === OrderStatus.Confirmed) {
            toast.error(OrderError.CONFIRMED_FOR_COMPLETED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Canceled) {
            toast.error(OrderError.COMPLETE_FOR_CANCELED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Pending) {
            toast.error(OrderError.NOT_YET_CONFIRM);
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
        if (task.status === OrderStatus.Confirmed) {
            toast.error(OrderError.CONFIRMED_FOR_COMPLETED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Canceled) {
            toast.error(OrderError.COMPLETE_FOR_CANCELED_ORDER);
            return;
        }
        if (task.status === OrderStatus.Pending) {
            toast.error(OrderError.NOT_YET_CONFIRM);
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

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = () => {
        setIsSheetOpen(true);
    };

    const closeSheet = () => {
        setIsSheetOpen(false);
    };

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
                            <PackageCheck className="mr-2 h-4 w-4" />
                            <span>Confirm</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCanceledOrder}>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Cancel</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleInProgressOrder}>
                            <Rocket className="mr-2 h-4 w-4" />
                            <span>In Progress</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCompletedOrder}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            <span> Complete</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleRefundedOrder}>
                            <Undo2 className="mr-2 h-4 w-4" />
                            <span> Refund</span>
                        </DropdownMenuItem>
                    </>
                )}
                {admin?.position === Position.SELLER && (
                    <>
                        <DropdownMenuItem onClick={handleConfirmedOrder}>
                            <PackageCheck className="mr-2 h-4 w-4" />
                            <span>Confirm</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCanceledOrder}>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Cancel</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleInProgressOrder}>
                            <Rocket className="mr-2 h-4 w-4" />
                            <span>In Progress</span>
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
                    <DropdownMenuSubTrigger>
                        <WalletCards className="mr-2 h-4 w-4" />
                        <span>Method Payment</span>
                    </DropdownMenuSubTrigger>
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
                        // isSheetOpen && (
                        //     <div>
                        //         <OrderDetailSheet
                        //             onClose={() => {
                        //                 setIsSheetOpen(false);
                        //             }}
                        //         />
                        //     </div>
                        // );
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

// {
//     isSheetOpen && (
//         <Sheet>
//             {/* <SheetTrigger asChild>
//                     <Button variant="outline">Open</Button>
//                 </SheetTrigger> */}
//             <SheetContent>
//                 <SheetHeader>
//                     <SheetTitle>Edit profile</SheetTitle>
//                     <SheetDescription>
//                         Make changes to your profile here. Click
//                         save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label
//                             htmlFor="name"
//                             className="text-right"
//                         >
//                             Name
//                         </Label>
//                         <Input
//                             id="name"
//                             value="Pedro Duarte"
//                             className="col-span-3"
//                         />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label
//                             htmlFor="username"
//                             className="text-right"
//                         >
//                             Username
//                         </Label>
//                         <Input
//                             id="username"
//                             value="@peduarte"
//                             className="col-span-3"
//                         />
//                     </div>
//                 </div>
//                 <SheetFooter>
//                     <SheetClose asChild>
//                         <Button type="submit">Save changes</Button>
//                     </SheetClose>
//                 </SheetFooter>
//             </SheetContent>
//         </Sheet>
//     );
// }
