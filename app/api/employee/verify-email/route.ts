import { Discount } from '@/types/discount.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';

const URL=`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`
export async function POST(
  req: Request
) {
  try {

    // const { userId } = auth(); // check token

    const body = await req.json();
    const { email } = body;

    //  call api in here
    const verify = await axios.post(URL, {email});
    return NextResponse.json(verify.data);
  } catch (error) {
    console.log('[VERIFY_EMAIL_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};