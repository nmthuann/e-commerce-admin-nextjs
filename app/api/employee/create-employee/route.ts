import { ErrorInput, MiddlewareError, SystemError } from "@/constants/errors/errors";
import { Messages } from "@/constants/notifications/message";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const URL=`http://127.0.0.1:3333/auth/register-employee`
export async function POST(
  req: Request,
) {

    try {
    const token = cookies().get('token')?.value;
    if(!token){
      return NextResponse.json({message: MiddlewareError.TOKEN_MISSING});
    }

    const body = await req.json();

    const { 
        employee_id, 
        avatar_url, 
        first_name, 
        last_name, 
        gender, 
        birthday, 
        phone, 
        position_id, 
        address,
        email, } = body;

    if (!employee_id) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} employee_id`, { status: 400 });
    }

    // if (!avatar_url) {
    //   return new NextResponse(`${ErrorInput.FIELD_MISSING} avatar_url`, { status: 400 });
    // }


    if (!first_name) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} first_name`, { status: 400 });
    }

    if (!last_name) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} last_name`, { status: 400 });
    }

    if (!gender) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} gender`, { status: 400 });
    }

    if (!birthday) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} birthday`, { status: 400 });
    }

    if (!phone) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} phone`, { status: 400 });
    }

    if (!address) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} address`, { status: 400 });
    }

    if (!position_id) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} position_id`, { status: 400 });
    }

    if (!email) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} email`, { status: 400 });
    }
    

    

    //  call api in here
    const register = 
        await axios.post(`${URL}/${email}`, 
        {
            avatar_url,
            employee_id,
            first_name, 
            last_name, 
            gender, 
            birthday, 
            phone,
            address,
            position_id,
        },{
           headers: {
          'Authorization': `Bearer ${token}` 
        }
        });
   

    // if(register.data.message === ErrorInput.EMAIL_NOT_FOUND){
    //   return NextResponse.json(register.data);
    // }
    // if(register.data.message === Messages.CREATE_EMPLOYEE_SUCCESS){
    //    return NextResponse.json(register.data);
    // }

    return NextResponse.json(register.data);
  } catch (error) {
    console.log('[CHECK_REGISTER]', error);
    throw new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 })
  }
}