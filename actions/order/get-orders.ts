import { IOrder } from "@/types/order.interface";

export async function GetOrders(): Promise<IOrder[]> {
    try {
        const URL = `${process.env.API_URL}/order/get-orders`;
        const options = {
            method: 'GET',
        };
        const res = await fetch(URL, options);
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
