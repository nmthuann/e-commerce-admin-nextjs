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
    // console.log("discount:::::",discount.data)
    return NextResponse.json(verify.data);
  } catch (error) {
    console.log('[DISCOUNTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



export async function GET() {
  try {
    const getUrl =`${process.env.NEXT_PUBLIC_API_URL}/discount/get-discounts`
    const discounts = await axios.get(getUrl)
    return NextResponse.json(discounts.data);
  } catch (error) {
    console.log('[DISCOUNTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};