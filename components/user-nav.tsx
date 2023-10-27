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
import { authActions } from "@/redux/features/auth-slice";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { useAuth } from "@/providers/auth-provider";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";

export function UserNav() {
    // const { admin, logout } = useAuth();
    const admin = useAppSelector((state) => state.auth.currentAdmin);

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        // Thực hiện đăng xuất
        // Xóa thông tin người dùng khỏi Redux
        dispatch(authActions.logout());
    };

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
