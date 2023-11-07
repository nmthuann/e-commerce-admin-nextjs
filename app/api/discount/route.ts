import { Discount } from '@/types/discount.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';

const URL=`${process.env.NEST_PUBLIC_VERCEL_URL}/discount/create`
export async function POST(
  req: Request
) {
  try {

    // const { userId } = auth(); // check token

    const body = await req.json();

    const { description, expired, percent } = body;

    // if (!token) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!description) {
      return new NextResponse("description is required", { status: 400 });
    }
    
    if (!expired) {
      return new NextResponse("expired is  required", { status: 400 });
    }

    if (!percent) {
      return new NextResponse("percent is  required", { status: 400 });
    }

    //  call api in here
    const discount= await axios.post(URL, {description, expired, percent});
    console.log("discount:::::",discount.data)
    return NextResponse.json(discount.data);
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