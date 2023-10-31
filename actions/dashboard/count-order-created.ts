import { IOrder } from "@/types/order.interface";

export async function CountOrdersCreated(): Promise<number> {
    try {
        const GET_ORDERS_URL = `${process.env.NEXT_PUBLIC_API_URL}/order/get-orders`
        const options = {
            method: 'GET',
        };
        const res= await fetch(GET_ORDERS_URL, options);
        const orders: IOrder[] = await res.json();
        return orders.length
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}