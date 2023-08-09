"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, CategoryColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const parmas = useParams();
  const router = useRouter();

  console.log("CategoriesClient", parmas)
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/* Hover */}
              <Button onClick={() => router.push(`/category/create`)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add A New Category </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator />
      <DataTable searchKey="category_name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="category" entityIdName="category_id" />
    </>
  );
};