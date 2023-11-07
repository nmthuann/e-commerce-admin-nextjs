import { Discount } from '@/types/discount.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const URL=`http://127.0.0.1:3333/employee/create/`
export async function POST(
  req: Request
) {
    const cookieStore = cookies()
    const email = cookieStore.get('email')
    try {

    // const { userId } = auth(); // check token

    const body = await req.json();
    const data = {
      employee_id: body.employee_id,
      salary: parseInt(body.salary),
      position_id: body.position_id
    }

    //  call api in here
    const employee = await axios.post(`${URL}${email?.value}`, data);

    return NextResponse.json(await employee.data);
  } catch (error) {
    console.log('[EMPLOYEE_POST]', error);
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