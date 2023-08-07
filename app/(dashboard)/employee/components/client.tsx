"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { EmployeeColumn, columns } from "./columns";

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
        <Button onClick={() => router.push(`/Employee/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="employee_name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Employees" />
      <Separator />
      <ApiList entityName="employee" entityIdName="employee_id" />
    </>
  );
};