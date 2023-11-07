"use client";
import { CountOrdersCreated } from "@/actions/dashboard/count-order-created";
import { CountProductSold } from "@/actions/dashboard/count-product-sold";
import {
    GraphData,
    getGraphRevenue,
} from "@/actions/dashboard/get-monthly-revenue";
import { GetTotalRevenue } from "@/actions/dashboard/get-total-revenue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatter } from "@/lib/utils";
// import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CreditCard, Package, Receipt, Users2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OverviewTab from "./components/overview-tab";
import { AnalyticsTab } from "./components/analytics-tab";
import ReportsTab from "./components/reports-tab";

import { writeFileSync } from "fs";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const HomePage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const admin = useAppSelector((state) => state.auth.currentAdmin?.name);

    const [graphRevenue, setGraphRevenue] = useState<GraphData[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderCreated, setOrderCreated] = useState(0);
    const [productInStock, setProductInStock] = useState(0);
    const DataDashboard = () => {
        CountOrdersCreated().then((res) => setOrderCreated(res));
        getGraphRevenue().then((res) => setGraphRevenue(res));
        GetTotalRevenue().then((res) => setTotalRevenue(res));
        CountProductSold().then((res) => setProductInStock(res));
    };

    useEffect(() => {
        if (admin != null) {
            DataDashboard();
        } else {
            router.push("auth/login");
        }
    }, []);

    const handleReport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");

        // Thêm dữ liệu vào bảng Excel (ví dụ)
        worksheet.addRow(["Tên", "Tuổi"]);
        worksheet.addRow(["John Doe", 30]);
        worksheet.addRow(["Jane Smith", 25]);

        // Tạo một tệp Excel tạm thời trong bộ nhớ
        const buffer = await workbook.xlsx.writeBuffer();

        // Lưu tệp Excel và xuất ra
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `report_${Date.now()}.csv`);
    };

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    {/* <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2> */}
                    <Heading
                        title="Dashboard"
                        description="Overview of your store"
                    />
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker />
                        <Button onClick={handleReport}>Report</Button>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="notifications">
                            Notifications
                        </TabsTrigger>
                    </TabsList>
                    <Separator />
                    <div className="grid gap-4 grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Tổng Doanh Thu
                                </CardTitle>
                                <Receipt className="h-4 w-4 text-muted-foreground" />
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
                                    Đơn hàng đã tạo
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
                                    Sản phẩm đã bán
                                </CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {productInStock}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Tổng số khách hàng
                                </CardTitle>
                                <Users2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">56</div>
                            </CardContent>
                        </Card>
                    </div>
                    <TabsContent value="overview" className="space-y-4">
                        <OverviewTab data={graphRevenue} />
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                        <AnalyticsTab
                            dataLineChart={data03}
                            dataPieChart={data02}
                        />
                    </TabsContent>
                    <TabsContent value="reports" className="space-y-4">
                        <ReportsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
export default HomePage;

const data01 = [
    {
        name: "Group A",
        value: 400,
    },
    {
        name: "Group B",
        value: 300,
    },
    {
        name: "Group C",
        value: 300,
    },
    {
        name: "Group D",
        value: 200,
    },
    {
        name: "Group E",
        value: 278,
    },
    {
        name: "Group F",
        value: 189,
    },
];

const data02 = [
    {
        name: "Group A",
        ma: 2400,
    },
    {
        name: "Group B",
        ma: 4567,
    },
    {
        name: "Group C",
        ma: 1398,
    },
    {
        name: "Group D",
        ma: 9800,
    },
    {
        name: "Group E",
        ma: 3908,
    },
    {
        name: "Group F",
        ma: 4800,
    },
];

const data03 = [
    {
        name: "Jan",
        uv: 4000,
        pv: 2400,
    },
    {
        name: "Feb",
        uv: 3000,
        pv: 1398,
    },
    {
        name: "Mar",
        uv: 2000,
        pv: 9800,
    },
    {
        name: "Apr",
        uv: 2780,
        pv: 3908,
    },
    {
        name: "May",
        uv: 1890,
        pv: 4800,
    },
    {
        name: "Jun",
        uv: 2390,
        pv: 3800,
    },
    {
        name: "Jul",
        uv: 3490,
        pv: 4300,
    },

    {
        name: "Aug",
        uv: 3490,
        pv: 4300,
    },
    {
        name: "Sep",
        uv: 3490,
        pv: 4300,
    },
    {
        name: "Oct",
        uv: 3490,
        pv: 4300,
    },
    {
        name: "Nov",
        uv: 3490,
        pv: 4300,
    },
    {
        name: "Dec",
        uv: 3490,
        pv: 4300,
    },
];
