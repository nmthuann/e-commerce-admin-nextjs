import { Discount } from '@/types/discount.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const URL=`${process.env.NEXT_PUBLIC_API_URL}/order/create/`
export async function POST(
  req: Request
) {
    const cookieStore = cookies()
    const email = cookieStore.get('email')
    try {

    // const { userId } = auth(); // check token

    const body = await req.json();
    const data = {
      order_id: body.order_id,
      salary: body.salary,
      position_id: body.position_id
    }

    //  call api in here
    const order = await axios.post(`${URL}${email}`, data);

    return NextResponse.json(await order.data);
  } catch (error) {
    console.log('[order_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};