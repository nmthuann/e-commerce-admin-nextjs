import { GetPositions } from "@/actions/employee/get-postions";
import { EmployeeForm } from "./components/employee-form";

const EmployeeNewPage = async () => {
    const positions = await GetPositions();

    return (
        <>
            <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
                {/* Content for the center column */}
                <div className="flex flex-col items-center justify-center mt-4">
                    <EmployeeForm positions={positions} />
                </div>
            </div>
        </>
    );
};

export default EmployeeNewPage;
