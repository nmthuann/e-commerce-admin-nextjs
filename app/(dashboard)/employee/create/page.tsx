
// import { Metadata } from "next"
// import Image from "next/image"



// import { cn } from "@/lib/utils"

// import { useState } from "react"

// import { GetPositions } from "@/actions/employee/get-postions"
// import { UserForm } from "./components/user-form"
// import OTPCard from "./components/otp-verify"
// import { EmployeeForm } from "./components/employee-form"
// import { Position } from "@/types/position.interface"


// export const metadata: Metadata = {
//   title: "Create Employee",
//   description: "Examples of cards built using the components.",
// }

// // function DemoContainer({
// //   className,
// //   ...props
// // }: React.HTMLAttributes<HTMLDivElement>) {
// //   return (
// //     <div
// //       className={cn(
// //         "flex items-center justify-center [&>div]:w-full",
// //         className
// //       )}
// //       {...props}
// //     />
// //   )
// // }

// interface EmployeePageProps{
//   positions: Position[];
// }

// const EmployeePage: React.FC<EmployeePageProps> = ({ positions }) => {

//     // const   positions = await GetPositions();
//     const [isVerified, setIsVerified] = useState(false);
//     const [showEmployeeForm, setShowEmployeeForm] = useState(false);

//   const handleOTPVerified = () => {
//     setIsVerified(true);
//   };

//   const handleUserFormSubmit = () => {
//     setShowEmployeeForm(true);
//   };

//   return (
//     <>
//       <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
//         <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
//         </div>
//         <div className="col-span-2 grid items-start gap-6 lg:col-span-1">


//           {isVerified && !showEmployeeForm  ?(
//             <UserForm onSubmit={handleUserFormSubmit} />
//           ) : (
//             <OTPCard onVerified={handleOTPVerified} />
//           )}
//           {showEmployeeForm && <EmployeeForm  positions={positions}  />}
//             {/* && !showEmployeeForm ?  */}

          
//         </div>
//         <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
//         </div>
//       </div>
//     </>
//   );
// }

// export default EmployeePage;






import { GetPositions } from "@/actions/employee/get-postions";
import { EmployeeForm } from "./components/employee-form";
import { CreateEmployee } from "./components/create-employee";

const EmployeePage = async (
) => {

  const positions = await GetPositions();

  return (
    <>  
        <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          {/* Content for the center column */}
          <CreateEmployee positions={positions} />
        </div>
      
    </>
  );
}

export default EmployeePage;