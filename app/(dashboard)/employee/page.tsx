// "use client"
import { format } from "date-fns";

// import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { EmployeesClient } from "@/app/(dashboard)/employee/components/client";
import { EmployeeColumn } from "./components/columns";
import { GetEmployeeList } from "@/actions/employee/get-employees";

const EmployeesPage = async () => {

    const employees = await GetEmployeeList();
    console.log(employees)
    const formattedEmployees: EmployeeColumn[] | undefined = employees.map((item) => ({
        avatar_url: item.avatar_url,
        employee_id: item.employee_id,
        employee_name: item.employee_name,
        birthday: item.birthday,
        gender: item.gender,
        salary: item.salary,
        position: item.position,
        create: item.create,
        work_status: item.work_status,
        address: item.address
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeesClient data={formattedEmployees} />
      </div>
    </div>
  );
};

export default EmployeesPage;