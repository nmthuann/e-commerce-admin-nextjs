import { IOrder } from "@/types/order.interface";
import axios from "axios";

const GET_ORDERS_URL = `${process.env.NEXT_PUBLIC_API_URL}/order/get-orders`

export async function GetOrders(): Promise<IOrder[]> {
    const orders: IOrder[] = await axios.get(GET_ORDERS_URL);
    return orders;
}