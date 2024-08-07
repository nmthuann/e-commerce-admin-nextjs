"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Position } from "@/constants/enums/positon.enum";
import { Button } from "./ui/button";
import {
    Mail,
    PackageCheck,
    PieChart,
    Settings,
    Shuffle,
    Smartphone,
    Ticket,
    UserCog,
    Users,
} from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const admin = useAppSelector((state) => state.auth.currentAdmin);
    // const { admin } = useAuth();

    const [activeTab, setActiveTab] = useState("");

    const routes = [
        {
            href: `/`,
            label: "Dashboard",
            active: pathname === `/`,
            icon: PieChart,
        },
        {
            href: `/category`,
            label: "Categories",
            active: pathname === `/category/`,
            icon: Shuffle,
        },
        {
            href: `/discount`,
            label: "Discounts",
            active: pathname === `/discount/`,
            icon: Ticket,
        },
        {
            href: `/product`,
            label: "Products",
            active: pathname === `/product/`,
            icon: Smartphone,
        },
        {
            href: `/task`,
            label: "Tasks",
            active: pathname === `/task/`,
            icon: PackageCheck,
        },
        {
            href: `/employee`,
            label: "Employees",
            active: pathname === `/employee/`,
            icon: UserCog,
        },
        {
            href: `/customer`,
            label: "Customers",
            active: pathname === `/customer/`,
            icon: Users,
        },
        {
            href: `/setting`,
            label: "Settings",
            active: pathname === `/setting/`,
            icon: Settings,
        },
    ];

    if (admin?.position === Position.STORE_MANAGER) {
        const filteredRoutes = routes.filter(
            (route) =>
                route.label === "Dashboard" ||
                route.label === "Categories" ||
                route.label === "Discounts" ||
                route.label === "Products" ||
                route.label === "Tasks" ||
                route.label === "Employees" ||
                route.label === "Customers" ||
                route.label === "Settings"
        );
        routes.length = 0; // Clear the routes array
        routes.push(...filteredRoutes); // Add the filtered routes back to the array
    } else if (admin?.position === Position.SHIPPER) {
        const filteredRoutes = routes.filter(
            (route) =>
                route.label === "Task" ||
                route.label === "Dashboard" ||
                route.label === "Settings"
        );
        routes.length = 0; // Clear the routes array
        routes.push(...filteredRoutes); // Add the filtered routes back to the array
    } else if (admin?.position === Position.SELLER) {
        const filteredRoutes = routes.filter(
            (route) => route.label !== "Employees"
        );
        routes.length = 0; // Clear the routes array
        routes.push(...filteredRoutes);
    } else if (admin?.position === Position.WAREHOUSE) {
        const filteredRoutes = routes.filter(
            (route) => route.label !== "Employees"
        );
        routes.length = 0; // Clear the routes array
        routes.push(...filteredRoutes);
    } else {
        routes.length = 1;
    }

    useEffect(() => {
        // Update the active tab when the pathname changes
        setActiveTab(pathname);
        // console.log("Pathname changed:", pathname);
    }, [pathname]);

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {routes.map((route) => (
                // <Link
                //     key={route.href}
                //     href={route.href}
                //     // className={cn(
                //     //     "text-sm font-medium transition-colors hover:text-primary",
                //     //     route.active
                //     //         ? "text-black dark:text-white"
                //     //         : "text-muted-foreground"
                //     // )}
                //     className={cn(
                //         "text-sm font-medium transition-colors",
                //         route.active
                //             ? "hover:text-white text-black dark:text-white"
                //             : "hover:text-primary text-black"
                //     )}
                // >
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors",
                        route.active
                            ? "hover:text-white text-black dark:text-white"
                            : "hover:text-primary text-black",
                        activeTab === route.href && "text-black" // Add this line
                    )}
                >
                    {/* <Button className="bg-white text-black hover:text-white"> */}
                    <Button
                        className={cn(
                            "bg-white text-black hover:text-white",
                            route.active &&
                                "bg-gray-800 text-white hover:text-white"
                        )}
                    >
                        <route.icon className="mr-2 h-4 w-4 " />
                        {route.label}
                    </Button>
                </Link>
            ))}
        </nav>
    );
}
