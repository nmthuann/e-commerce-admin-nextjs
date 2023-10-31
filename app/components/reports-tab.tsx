import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RecentSales } from "./reports/recent-sales";

const ReportsTab = () => {
    return (
        <div>
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

export default ReportsTab;
