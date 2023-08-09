import { format } from "date-fns";

// import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { CustomersClient } from "./components/client";
import { CustomerColumn, columns } from "./components/columns";
import { GetCustomerList } from "@/actions/customer/get-customers";
import { DataTable } from "./components/data-table";

const CustomersPage = async () => {

    const customers = await GetCustomerList();
    console.log(customers)
    const formattedCustomers: CustomerColumn[] | undefined = customers.map((item) => ({
        avatar_url: item.avatar_url,
        customer_id: item.customer_id,
        customer_name: item.customer_name,
        birthday: item.birthday,
        gender: item.gender,
        count_order: item.count_order,
        total_price: item.total_price,
        canceled: item.canceled,
        address: item.address
    }));

  return (
    <div className="flex-col">
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomersClient data={formattedCustomers}  />
        <DataTable data={formattedCustomers} columns={columns}/>
      </div>
    </div>
  );
};

export default CustomersPage;