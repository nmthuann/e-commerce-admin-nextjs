"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, DiscountColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface DiscountsClientProps {
  data: DiscountColumn[];
}

export const DiscountsClient: React.FC<DiscountsClientProps> = ({
  data
}) => {
  const parmas = useParams();
  const router = useRouter();

 
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Discounts (${data.length})`} description="Manage discounts for your store" />
        <Button onClick={() => router.push(`/discount/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="description" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="discount" entityIdName="discount_id" />
    </>
  );
};