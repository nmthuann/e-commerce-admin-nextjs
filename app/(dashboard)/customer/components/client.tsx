"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { CustomerColumn, columns } from "./columns";

interface CustomersClientProps {
  data: CustomerColumn[];
};

export const CustomersClient: React.FC<CustomersClientProps> = ({
  data
}) => {
  // const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Customers (${data.length})`} description="Manage Customers for your store" />
        <Button onClick={() => router.push(`/customer/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      {/* <Separator />
      <DataTable searchKey="customer_name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Customers" />
      <Separator /> */}
      {/* <ApiList entityName="customer" entityIdName="customer_id" /> */}
    </>
  );
};