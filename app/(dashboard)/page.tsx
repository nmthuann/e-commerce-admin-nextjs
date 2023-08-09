import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
// import { Overview } from "@/components/overview";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetTaskOrders } from "@/actions/order/get-task-order";
import { GetTotalRevenue } from "@/actions/dashboard/get-total-revenue";
import { CounttProductSold } from "@/actions/dashboard/count-product-sold";
import { formatter } from "@/lib/utils";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/dashboard/get-monthly-revenue";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getGraphRevenue } from "@/actions/get-graph-revenue";
// import { getStockCount } from "@/actions/get-stock-count";
// import { formatter } from "@/lib/utils";

interface DashboardPageProps {
//   params: {
//     storeId: string;
//   };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  //params -> 
}) => {

  const graphRevenue = await getGraphRevenue();

  const totalRevenue = await GetTotalRevenue();
  const orderCreated = (await GetTaskOrders()).length;
  const productInStock = await CounttProductSold();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
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
              <div className="text-2xl font-bold"> {formatter.format(totalRevenue)} </div>
                              
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderCreated}</div>
                                        {/* +{salesCount} */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productInStock}</div>
                                      
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;   