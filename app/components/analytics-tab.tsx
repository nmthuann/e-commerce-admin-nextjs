import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisLineChart } from "./analytics/line-chart";
import { AnalysisPieChart } from "./analytics/pie-chart";
import { AnalysisAreaChart } from "./analytics/area-chart";

interface AnalyticsTabProps {
    dataLineChart: any[];
    dataPieChart: any[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
    dataLineChart,
    dataPieChart,
}) => {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            Biểu đồ thống kê mức độ ảnh hưởng đơn hàng Online và
                            Offline
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <PieChart data={graphRevenue} /> */}
                        <AnalysisAreaChart data={dataLineChart} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>
                            Biểu đồ % sự ảnh hưởng của hãng theo đơn hàng
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <PieChart data={graphRevenue} /> */}
                        <AnalysisPieChart data={dataPieChart} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
