"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Messages } from "@/constants/notifications/message";
interface EmployeeDialogProps {
    onClose: () => void; // Function to close the dialog
    //   routers: string;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ onClose }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const handleConfirm = async () => {
        // try {
        //     const response = await axios.post("/api/employee/verify-email", {
        //         email,
        //     });
        //     // console.log("API Response:", response.data);
        //     if (response.data.message) {
        //         toast.error(response.data.message);
        //     } else {
        //         toast.success(Messages.EMAIL_VALID);
        //         onClose();
        //         router.push({
        //             pathname: "/employee/create-employee",
        //             query: { email },
        //         }); // -> chuyển sang trang create"/employee/create-employee"
        //     }
        // } catch (error: any) {
        //     toast.error(`${error}`);
        //     onClose();
        //     console.error("API Error:", error);
        // }
        toast.success(Messages.EMAIL_VALID);
        onClose();
        router.push(`/employee/create-employee/${email}`); // -> chuyển sang trang create"/employee/create-employee"
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Employee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDialog;
