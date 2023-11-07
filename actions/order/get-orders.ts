import { IOrder } from "@/types/order.interface";

export async function GetOrders(): Promise<IOrder[]> {
    try {
        const URL = `http://127.0.0.1:3333/order/get-orders`;
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
