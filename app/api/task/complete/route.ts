import { MiddlewareError, StatusCode, SystemError } from '@/constants/errors/errors';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const URL=`http://127.0.0.1:3333/order/update-completed/`
export async function POST(
  req: Request
) {
  try {
    
    const token = cookies().get('token')?.value;
    if(!token){
      return NextResponse.json({message: MiddlewareError.TOKEN_MISSING});
    }

    const {order_id} = await req.json();

    console.log("COMPLETED::::",`${URL}${parseInt(order_id, 10)}`)

    const updateStatus = await axios.patch(`${URL}${parseInt(order_id, 10)}`,{},);
    
    return NextResponse.json(updateStatus.data);
  } catch (error) {
    console.log(error)
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
}