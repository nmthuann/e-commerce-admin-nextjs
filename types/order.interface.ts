export interface IOrder{
    order_id: number;
    total_price:number;
    status: string;
    delivery_address: string;
    contact: string
    shipping_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date
}