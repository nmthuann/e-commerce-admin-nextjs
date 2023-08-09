"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { EmployeeColumn, columns } from "./columns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmployeesClientProps {
  data: EmployeeColumn[];
};

export const EmployeesClient: React.FC<EmployeesClientProps> = ({
  data
}) => {
  // const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Employees (${data.length})`} description="Manage Employees for your store" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/* Hover */}
              <Button onClick={() => router.push(`/Employee/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
              
              </TooltipTrigger>
            <TooltipContent>
              <p>Create Account for Employee</p>
            </TooltipContent>
          </Tooltip>
      </TooltipProvider>
        
      </div>
      <Separator />
      <DataTable searchKey="employee_name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Employees" />
      <Separator />
      <ApiList entityName="employee" entityIdName="employee_id" />
    </>
  );
};