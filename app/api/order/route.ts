import { Discount } from '@/types/discount.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const URL=`${process.env.NEXT_PUBLIC_API_URL}/order/create-offline`
export async function POST(
  req: Request
) {
    // const cookieStore = cookies()
    // const email = cookieStore.get('email')
    try {

    // const { userId } = auth(); // check token

    const body = await req.json();

    
    const data = {
      contact: body.contact,
      delivery_address: body.delivery_address,
      discount_id: parseInt(body.discount_id),
      order_detail: body.order_detail.map((item: { product_id: string; quantity: string; }) => ({
    product_id: parseInt(item.product_id),
    quantity: parseInt(item.quantity)
  })), // body.order_detail.slice(),
      shipping_id: parseInt(body.shipping_id),
      employee_id: body.employee_id,
    }

    //  call api in here
    const order = await axios.post(URL, data); //`${URL}${email}`

    return NextResponse.json(await order.data);
  } catch (error) {
    console.log('[order_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


