import { Metadata } from "next";

import { GetPositions } from "@/actions/employee/get-postions";
// import { EmailProvider } from "@/contexts/email.context";
import { CreateEmployeeForm } from "./components/create-employee-form";

export const metadata: Metadata = {
    title: "Tạo tài khoản nhân viên",
    description: "Authentication forms built using the components.",
};
export default async function CreateEmployeePage() {
    const positions = await GetPositions();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen my-8">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight  mb-2">
                        Tạo Tài Khoản Nhân Viên
                    </h2>
                    <p className="text-sm text-muted-foreground ">
                        Tạo tài khoản để truy cập website!
                    </p>
                </div>
                <div className="mt-4">
                    {/* <EmailProvider value={{ email }}> */}
                    {/* Các phần tử và component khác trong EmployeeDialog */}
                    <CreateEmployeeForm positions={positions} />
                    {/* </EmailProvider> */}
                    {/* <CreateEmployeeForm positions={positions} /> */}
                </div>
            </div>
        </div>
    );
}
