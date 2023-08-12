
export interface IOrder{
    order_id: number;
    total_price:number;
    status: string;
    //discount_id: string;
    //user_id: string;
    delivery_address: string;
    contact: string
    shipping_id: number;
    // payment_id: 
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date
}