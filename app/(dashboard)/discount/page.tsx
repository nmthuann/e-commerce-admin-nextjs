import { DiscountColumn } from "./components/columns";
import { DiscountsClient } from "./components/client";

import { Discount } from "@/types/discount.interface";
import { GetDiscounts } from "@/actions/discount/get-discounts";

const DiscountsPage = async () => {
    const discounts = await GetDiscounts();
    const formattedDiscounts: DiscountColumn[] = discounts.map(
        (item: Discount) => ({
            discount_id: String(item.discount_id),
            description: item.description,
            expired: item.expired,
            percent: item.percent,
        })
    );

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <DiscountsClient data={formattedDiscounts} />
            </div>
        </div>
    );
};

export default DiscountsPage;

// import { FC } from "react";
// import { GetServerSideProps } from "next";
// import { DiscountColumn } from "./components/columns";
// import { DiscountsClient } from "./components/client";

// import { Discount } from "@/types/discount.interface";
// import { GetDiscounts } from "@/actions/discount/get-discounts";

// interface DiscountsPageProps {
//     formattedDiscounts: DiscountColumn[];
// }

// const DiscountsPage: FC<DiscountsPageProps> = ({ formattedDiscounts }) => (
//     <div className="flex-col">
//         <div className="flex-1 space-y-4 p-8 pt-6">
//             <DiscountsClient data={formattedDiscounts} />
//         </div>
//     </div>
// );

// export const getServerSideProps: GetServerSideProps<
//     DiscountsPageProps
// > = async () => {
//     const discounts = await GetDiscounts();
//     const formattedDiscounts = discounts.map((item: Discount) => ({
//         discount_id: String(item.discount_id),
//         description: item.description,
//         expired: item.expired,
//         percent: item.percent,
//     }));

//     return {
//         props: {
//             formattedDiscounts,
//         },
//     };
// };

// export default DiscountsPage;
