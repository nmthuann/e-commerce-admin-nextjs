import { Metadata } from "next";
import { CreateEmployeeForm } from "./components/create-employee-form";
import { GetPositions } from "@/actions/employee/get-postions";

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
                    <CreateEmployeeForm positions={positions} />
                </div>
            </div>
        </div>
    );
}
