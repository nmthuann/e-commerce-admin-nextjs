"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentSalesProps {
    topUser: IUserReport[];
}

interface IUserReport {
    avatar_url: string;
    user_id: number;
    total_price: number;
    email: string;
    full_name: string;
}

export const RecentSales: React.FC<RecentSalesProps> = ({ topUser }) => {
    //  call API In Here
    return (
        <div className="space-y-8">
            {topUser.map((user: IUserReport) => (
                <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar_url} alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.full_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">
                        +{user.total_price} VND
                    </div>
                </div>
            ))}

            {/* <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Isabella Nguyen
                    </p>
                    <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        William Kim
                    </p>
                    <p className="text-sm text-muted-foreground">
                        will@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Sofia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
            </div> */}
        </div>
    );
};
