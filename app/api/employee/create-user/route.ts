import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const URL=`${process.env.NEXT_PUBLIC_API_URL}/user/create`
export async function POST(
  req: Request
) {
    const cookieStore = cookies()
    const email = cookieStore.get('email');

    console.log('email',email);

    try {

    // const { userId } = auth(); // check token

    const body = await req.json();
    const data = {
        first_name: body.first_name, 
        last_name:  body.last_name, 
        avatar_url: '',
        gender: body.gender,
        birthday: body.birthday,
        address: body.address,
        phone: body.phone,
        account:  String(email)
    }

    //  call api in here
    const verify = await axios.post(URL, data);
    // console.log("discount:::::",discount.data)

    return NextResponse.json(await verify.data);
  } catch (error) {
    console.log('[USER_POST]', error);
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