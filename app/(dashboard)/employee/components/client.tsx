

// import { Plus } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { Heading } from "@/components/ui/heading";
// import { Separator } from "@/components/ui/separator";
// import { ApiList } from "@/components/ui/api-list";

// import { EmployeeColumn, columns } from "./columns";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// interface EmployeesClientProps {
//   data: EmployeeColumn[];
// };

// export const EmployeesClient: React.FC<EmployeesClientProps> = ({
//   data
// }) => {
//   // const params = useParams();
//   const router = useRouter();

//   return (
//     <> 
//       <div className="flex items-center justify-between">
//         <Heading title={`Employees (${data.length})`} description="Manage Employees for your store" />
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger>
//               {/* Hover */}

//             {/* <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline">Create Employee</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Edit profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name" className="text-right">
//                     Email
//                   </Label>
//                   <Input id="email" value="Pedro Duarte" className="col-span-3" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button onClick={() => router.push(`/employee/create`)}>Cofirm</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog> */}

              
//               </TooltipTrigger>
//             <TooltipContent>
//               <p>Create Account for Employee</p>
//             </TooltipContent>
//           </Tooltip>
//       </TooltipProvider>
        
//       </div>
//       <Separator />
//       <DataTable searchKey="employee_name" columns={columns} data={data} />
//       <Heading title="API" description="API Calls for Employees" />
//       <Separator />
//       <ApiList entityName="employee" entityIdName="employee_id" />
//     </>
//   );
// };

"use client";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';

import { EmployeeColumn, columns } from './columns';
import EmployeeDialog from './employee-dialog'; // Import the new EmployeeDialog component
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOrigin } from '@/hooks/use-origin';

interface EmployeesClientProps {
  data: EmployeeColumn[];
}

export const EmployeesClient: React.FC<EmployeesClientProps> = ({ data }) => {
  const [isDialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility
  // const router = useRouter();
  // const orgin = useOrigin();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Employees (${data.length})`} description="Manage Employees for your store" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>  
              <div> 
                <EmployeeDialog onClose={() => {
                  setDialogOpen(false)
                }} />  
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create Account for Employee</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator />
      <DataTable searchKey="employee_name" columns={columns} data={data} />
      {/* Render the EmployeeDialog component when the dialog is open */}
      
       {/* routers={orgin} */}
      <ApiList entityName="employee" entityIdName="employee_id" />
      {/* Rest of the code */}
    </>
  );
};