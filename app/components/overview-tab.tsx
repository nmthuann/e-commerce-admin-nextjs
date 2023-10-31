import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Overview } from "./overview/overview";
import { RecentSales } from "./overview/recent-sales";

interface OverviewTabProps {
    data: any[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data={data} />
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
    );
};

export default OverviewTab;
