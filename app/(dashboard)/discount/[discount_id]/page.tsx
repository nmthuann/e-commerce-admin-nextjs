// import prismadb from "@/lib/prismadb";

import { GetDiscountById } from "@/actions/discount/get-discount";
import { DiscountForm } from "@/app/(dashboard)/discount/[discount_id]/components/discount-form";
import { useParams } from "next/navigation";
export const revalidate = 0;
const DiscountPage = async (
 {params}: {params: { discount_id: string}}
) => {

  let discount  = null
  if((params.discount_id).toString() != 'create'){
    discount = await GetDiscountById(parseInt(params.discount_id));
  } 

  // const discount = await GetDiscountById(params.discount_id);
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DiscountForm  initialData={discount} /> 
        {/* billboards={billboards} */}
      </div>
    </div>
  );
}
export default DiscountPage;