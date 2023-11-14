import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RecentSales } from "./reports/recent-sales";

interface ReportsTabProps {
    reportsTab: any[];
}

export const ReportsTab: React.FC<ReportsTabProps> = ({ reportsTab }) => {
    return (
        <div>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        You made 32 sales this year.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentSales topUser={reportsTab} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportsTab;
