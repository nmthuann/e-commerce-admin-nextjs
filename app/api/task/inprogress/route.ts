import { MiddlewareError, StatusCode, SystemError } from '@/constants/errors/errors';
import { Discount } from '@/types/discount.interface';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const URL=`${process.env.SERVER_URL}/order/update-inprogress/`
export async function POST(
  req: Request
) {
  try {
    
    const token = cookies().get('token')?.value;
    if(!token){
      return NextResponse.json({message: MiddlewareError.TOKEN_MISSING});
    }

    const {order_id} = await req.json();

    console.log("INPROGRESS::::",`${URL}${parseInt(order_id, 10)}`)

    const updateStatus = await axios.patch(`${URL}${parseInt(order_id, 10)}`,{},);
    
    return NextResponse.json(updateStatus.data);
  } catch (error) {
    console.log(error)
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
}