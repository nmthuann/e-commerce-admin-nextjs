"use client";
import { LoginApi } from "@/actions/auth/login";
import { CounttProductSold } from "@/actions/dashboard/count-product-sold";
import {
    GraphData,
    getGraphRevenue,
} from "@/actions/dashboard/get-monthly-revenue";
import { GetTotalRevenue } from "@/actions/dashboard/get-total-revenue";
import { RecentSales } from "@/components/recent-sales";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter } from "@/lib/utils";
// import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import axios from "axios";
import { CreditCard, DollarSign, Package } from "lucide-react";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
    const router = useRouter();
    // const login = useAuth();
    // const [login, setLogin] = useState(false);

    // const { admin } = useAuth();
    const dispatch = useAppDispatch();
    const admin = useAppSelector((state) => state.auth.currentAdmin?.name);

    const [graphRevenue, setGraphRevenue] = useState<GraphData[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderCreated, setOrderCreated] = useState(0);
    const [productInStock, setProductInStock] = useState(0);
    const DataDashboard = () => {
        getGraphRevenue().then((res) => setGraphRevenue(res));
        GetTotalRevenue().then((res) => setTotalRevenue(res));
        CounttProductSold().then((res) => setProductInStock(res));
    };

    useEffect(() => {
        // Sử dụng một useEffect mới để theo dõi biến login và chạy DataDashboard() khi login là true
        if (admin != null) {
            DataDashboard();
        } else {
            router.push("auth/login");
        }
    }, []);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading
                    title="Dashboard"
                    description="Overview of your store"
                />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {" "}
                                {formatter.format(totalRevenue)}{" "}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {orderCreated}
                            </div>
                            {/* +{salesCount} */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {productInStock}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            {/* <Overview data={graphRevenue} /> */}
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentSales />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default HomePage;

// const router = useRouter();
// const cookieStore = cookies();
// const token = cookieStore.get("token");
// if (!token) {
//     router.push("/auth/login");
// }

// interface DashboardPageProps {}

// const DashboardPage: React.FC<DashboardPageProps> = (
//     {
//         //params ->
//     }
// ) => {
//     const router = useRouter();
//     const cookieStore = cookies();
//     const token = cookieStore.get("token");
//     if (!token) {
//         router.push("/auth/login");
//     }
//     // const [graphRevenue, setGraphRevenue] = useState<GraphData[]>([]);
//     // const [totalRevenue, setTotalRevenue] = useState(0);
//     // const [orderCreated, setOrderCreated] = useState(0);
//     // const [productInStock, setProductInStock] = useState(0);

//     // useEffect(() => {
//     //     const cookieStore = cookies();
//     //     const token = cookieStore.get("token");
//     //     if (!token) {
//     //         router.push("/auth/login");
//     //     }
//     //     fetchData();
//     // }, []);

//     // const fetchData = () => {
//     //     getGraphRevenue().then((res) => setGraphRevenue(res));
//     //     GetTotalRevenue().then((res) => setTotalRevenue(res));

//     //     CounttProductSold().then((res) => setProductInStock(res));
//     //     // setGraphRevenue(graphRevenueRes);
//     //     // const totalRevenueRes = await GetTotalRevenue();
//     //     // setTotalRevenue(totalRevenueRes)
//     //     // const orderCreatedRes = (await GetTaskOrders()).length;
//     //     // setOrderCreated(orderCreatedRes)
//     //     // const productInStockRes = await CounttProductSold();
//     //     // setProductInStock(productInStockRes)
//     //     // GetTaskOrders().then(res => setOrderCreated(res));
//     // };
