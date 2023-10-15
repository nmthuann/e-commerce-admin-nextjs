"use client"
// import { GetPositions } from "@/actions/employee/get-postions";
import { CreateEmployee } from "./components/create-employee";

const EmployeePage = (
) => {

  // const positions = await GetPositions();

  return (
    <>  
        <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          {/* Content for the center column */}
          <CreateEmployee />
        </div>
      
    </>
  );
}

export default EmployeePage;