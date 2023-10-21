"use client";

import axios from "axios";
import {
    ChevronRight,
    Copy,
    Edit,
    Eye,
    MoreHorizontal,
    Trash,
    View,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProductColumn } from "./columns";
import { Messages, SuccessMessages } from "@/constants/notifications/message";
import { ProductError } from "@/constants/errors/errors";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CellActionProps {
    data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // // const params = useParams();
    // const [isDialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`api/product/${data.product_id}`);
            toast.success(SuccessMessages.MESSAGE_DELETED);
            router.refresh();
        } catch (error) {
            toast.error(ProductError.PRODUCT_ERROR);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`Product ${Messages.COPY_ID}`);
    };

    const [viewConfigDialogOpen, setViewConfigDialogOpen] = useState(false);

    // Rest of the component code
    const onViewConfiguation = (data: ProductColumn) => {
        setViewConfigDialogOpen(true);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.product_id)}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(`/product/${data.product_id}`)
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" /> Cập nhật
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onViewConfiguation(data)}>
                        <View className="w-4 h-4" /> Xem thông tin cấu hình
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {viewConfigDialogOpen && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Thông tin cấu hình</DialogTitle>
                        </DialogHeader>
                        <div className="px-4 py-2">
                            <Label>Model Name</Label>
                            <Input
                                type="text"
                                value={data.model_name}
                                readOnly
                            />
                            <Label>Ram</Label>
                            <Input type="text" value={data.ram} readOnly />
                            <Label>Memory</Label>
                            <Input type="text" value={data.memory} readOnly />
                            <Label>Cam trước</Label>
                            <Input
                                type="text"
                                value={data.front_camera}
                                readOnly
                            />
                            <Label>Cam Sau</Label>
                            <Input
                                type="text"
                                value={data.behind_camera}
                                readOnly
                            />
                            <Label>PIN</Label>
                            <Input type="text" value={data.battery} readOnly />
                            <Label>Kích Thước màn hình</Label>
                            <Input type="text" value={data.screen} readOnly />
                            <Label>Màu</Label>
                            <Input type="text" value={data.color} readOnly />
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => setViewConfigDialogOpen(false)}
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

//     onClick={() => (
//         <ProductDetailDialog
//             // onClose={() => {
//             //     setDialogOpen(true);
//             // }}
//             data={data}
//         />
//     )}
// >

// {
//     isDialogOpen && (
//         <ProductDetailDialog
//             product={data}
//             onClose={() => setDialogOpen(false)}
//         />
//     );
// }
