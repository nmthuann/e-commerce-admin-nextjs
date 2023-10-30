"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authActions } from "@/redux/reducers/auth-slice";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function UserNav() {
    // const { admin, logout } = useAuth();

    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const admin = useAppSelector((state) => state.auth.currentAdmin);

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (admin) {
            const userDataObject = JSON.parse(admin);
            if (userDataObject) {
                const { name, email, position, avatar_url } = userDataObject;
                // Gán giá trị vào biến admin
                dispatch(
                    authActions.login({ name, email, avatar_url, position })
                );
            }
        }
        setIsMounted(true);
    }, [dispatch]);

    const handleLogout = async () => {
        // Thực hiện đăng xuất
        const res = await axios.post("/api/auth/logout", {});
        toast.success(res.data);
        router.push("auth/login");

        // Xóa thông tin người dùng khỏi Redux
        dispatch(authActions.logout());
    };
    if (!isMounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={admin?.avatar_url}
                            // "https://firebasestorage.googleapis.com/v0/b/tttn-donghoonline.appspot.com/o/avatar%2Favatar.jpg?alt=media&token=1849d191-8530-42cc-b4bf-093f3aa1acc2"
                            alt="@shadcn"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {admin?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {admin?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
