
import { OrderForm } from "@/app/(dashboard)/order/create/components/order-form";

export const revalidate = 0;

const OrderPage = async (
 {params}: {params: { order_id: string}}
) => {
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm  />
      </div>
    </div>
  );
}
export default OrderPage;