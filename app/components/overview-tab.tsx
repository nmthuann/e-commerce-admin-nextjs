import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Overview } from "./overview/overview";
import { RecentSales } from "./overview/recent-sales";

// interface OverviewTabProps {
//     data: any[];
// }
interface OverviewTabProps {
    overview: any[];
    recentSales: any[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
    overview,
    recentSales,
}) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data={overview} />
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        You made 32 sales this year.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentSales topUser={recentSales} />
                </CardContent>
            </Card>
        </div>
    );
};

export default OverviewTab;
