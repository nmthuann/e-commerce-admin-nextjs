"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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

import { CustomerColumn } from "./columns";
import { UnknownError } from "@/constants/errors/errors";
import { Messages } from "@/constants/notifications/message";

interface CellActionProps {
    data: CustomerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onConfirm = async () => {
        try {
            setLoading(true);
            // await axios.delete(`/customer/${data.customer_id}`);
            router.refresh();
            toast.success(Messages.DELETED_SUCCESS);
        } catch (error) {
            toast.error(UnknownError.SOMETHING_WRONG);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onCopy = (customer_id: string) => {
        navigator.clipboard.writeText(customer_id);
        toast.success("Customer ID copied to clipboard.");
    };

    const onUpdate = (customer_id: string) => {
        // navigator.clipboard.writeText(customer_id);
        toast.success(`${Messages.DELETED_SUCCESS} ${customer_id}`);
    };

    const onDelete = (customer_id: string) => {
        // navigator.clipboard.writeText(customer_id);
        toast.success(`${Messages.UPDATED_CUSTOMER_SUCCESS} ${customer_id}`);
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
                    <DropdownMenuItem onClick={() => onCopy(data.customer_id)}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            // router.push(`/customer/${data.customer_id}`)
                            onUpdate(data.customer_id)
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={
                            () => onDelete(data.customer_id)
                            // setOpen(true)
                        }
                    >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
