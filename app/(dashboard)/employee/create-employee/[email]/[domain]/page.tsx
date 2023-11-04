import { Metadata } from "next";

import { GetPositions } from "@/actions/employee/get-postions";
// import { EmailProvider } from "@/contexts/email.context";
import { CreateEmployeeForm } from "./components/create-employee-form";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

export const metadata: Metadata = {
    title: "Tạo tài khoản nhân viên",
    description: "Authentication forms built using the components.",
};

async function getLocationData() {
    const data: any = await fs.readFile(
        path.join(
            process.cwd(),
            "app/(dashboard)/employee/create-employee/(data)/VN-location-data.json"
        )
    );

    const location: ILocation[] = JSON.parse(data.toString());

    return location; // z.array(taskSchema).parse(location);
}

export default async function CreateEmployeePage() {
    const location = await getTasks();
    const positions = await GetPositions();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen my-0">
            <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg m-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight  mb-2">
                        Tạo Tài Khoản Nhân Viên
                    </h2>
                    <p className="text-sm text-muted-foreground ">
                        Tạo tài khoản để truy cập website!
                    </p>
                </div>
                <div className="mt-4 ">
                    <CreateEmployeeForm
                        positions={positions}
                        location={location}
                        // location
                    />
                </div>
            </div>
        </div>
    );
}

async function getTasks(): Promise<ILocation[]> {
    const data = await fs.readFile(
        path.join(
            process.cwd(),
            "app/(dashboard)/employee/create-employee/(data)/VN-location-data.json"
        )
    );

    const location = JSON.parse(data.toString());

    return await location; // z.array(taskSchema).parse(tasks);
}

const location = [
    {
        Id: "01",
        Name: "Thành phố Hà Nội",
        Districts: [
            {
                Id: "001",
                Name: "Quận Ba Đình",
                Wards: [
                    {
                        Id: "00001",
                        Name: "Phường Phúc Xá",
                        Level: "Phường",
                    },
                    {
                        Id: "00004",
                        Name: "Phường Trúc Bạch",
                        Level: "Phường",
                    },
                ],
            },
            {
                Id: "002",
                Name: "Quận Hoàn Kiếm",
                Wards: [
                    {
                        Id: "00037",
                        Name: "Phường Phúc Tân",
                        Level: "Phường",
                    },
                    {
                        Id: "00040",
                        Name: "Phường Đồng Xuân",
                        Level: "Phường",
                    },
                ],
            },
        ],
    },
    {
        Id: "02",
        Name: "Tỉnh Hà Giang",
        Districts: [
            {
                Id: "024",
                Name: "Thành phố Hà Giang",
                Wards: [
                    {
                        Id: "00688",
                        Name: "Phường Quang Trung",
                        Level: "Phường",
                    },
                    {
                        Id: "00691",
                        Name: "Phường Trần Phú",
                        Level: "Phường",
                    },
                ],
            },
            {
                Id: "026",
                Name: "Huyện Đồng Văn",
                Wards: [
                    {
                        Id: "00712",
                        Name: "Thị trấn Phó Bảng",
                        Level: "Thị trấn",
                    },
                    {
                        Id: "00715",
                        Name: "Xã Lũng Cú",
                        Level: "Xã",
                    },
                ],
            },
        ],
    },
];
