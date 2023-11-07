import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const URL=`http://127.0.0.1:3333/auth/verify-otp`
export async function POST(
  req: Request
) {
  try {

    // const { userId } = auth(); // check token

    const body = await req.json();

    const { otp } = body;
    // const data = {
    //   otp: body.otp,

    // }

    //  call api in here
    const verify = await axios.post(URL, {otp});
    // cookies().set('email', await verify.data.email);
    
     cookies().set({
      name: 'email',
      value: await verify.data.email,
      httpOnly: true,
      secure: true ,
    })
    console.log("await verify.data.email", await verify.data.email);

    return NextResponse.json(await verify.data);
  } catch (error) {
    console.log('[VERIFY_OTP_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



// export async function GET() {
//   try {
//     const getUrl =`${process.env.NEXT_PUBLIC_API_URL}/discount/get-discounts`
//     const discounts = await axios.get(getUrl)
//     return NextResponse.json(discounts.data);
//   } catch (error) {
//     console.log('[DISCOUNTS_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };