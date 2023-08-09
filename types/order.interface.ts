
export interface IOrder{
    order_id: number;
    total_price:number;
    status: string;
    delivery_address: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date
}