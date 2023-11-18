"use client";

import { useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";

import { CustomerColumn, columns } from "./columns";

interface CustomersClientProps {
    data: CustomerColumn[];
}

export const CustomersClient: React.FC<CustomersClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Customers (${data.length})`}
                    description="Manage Customers for your store"
                />
            </div>
        </>
    );
};
