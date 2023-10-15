"use client"
import { GetPayments } from "@/actions/order/get-payments";
import { GetShippings } from "@/actions/order/get-shippings";
import { GetProducts } from "@/actions/product/get-products";
import { OrderForm } from "@/app/(dashboard)/order/create/components/order-form";
import { Payment } from "@/types/payment.interface";
import { useCallback, useEffect, useState } from "react";

// export const revalidate = 0;

const OrderPage = (

) => {

  
  const [payments,setPayment] =useState<Payment[]>([]);
  const [shippings,setShippings] =useState<any[]>([]);
  const [products,setProducts] =useState<any[]>([]);
  
  const initData=useCallback(()=>{
    GetPayments().then(setPayment)
     GetShippings().then(setShippings);
     GetProducts().then(setProducts);
  },[]) 
  useEffect(initData,[initData]);

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm payments={payments} shippings={shippings}  products={products}/>
      </div>
    </div>
  );
}
export default OrderPage;