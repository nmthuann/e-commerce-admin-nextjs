
 
import { ErrorInput, SystemError } from '@/constants/errors/errors';
import { Messages } from '@/constants/notifications/message';
import axios from 'axios';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
 
const URL=`${process.env.NEST_PUBLIC_VERCEL_URL}/auth/admin/login`
export async function POST(
  req: Request,
) {
  try {
    // const token = cookies().get('token')?.value;
    // if(token){
    //   return new NextResponse(Messages.EMAIL_VALID, { status: 200 });
    // }
    const body = await req.json();

    const { email, password } = body;

    if (!email) {
      return new NextResponse(ErrorInput.FIELD_MISSING, { status: 400 });
    }
    
    if (!password) {
      return new NextResponse(ErrorInput.FIELD_MISSING, { status: 400 });
    }

    //  call api in here
    const checkLogin = await axios.post(URL, {email, password});
    // console.log("checkLogin:::", checkLogin.data.first_name)
    const oneDay = 24 * 60 * 60 * 1000;

    // {httpOnly: true,expires: Date.now() - oneDay 
    cookies().set('token', checkLogin.data.access_token,{httpOnly: true});
    return NextResponse.json(checkLogin.data);
  } catch (error) {
    console.log('[CHECK_LOGIN]', error);
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
}


 // {httpOnly: true, expires: Date.now() - oneDay }
    // cookies().set({
    //     name: 'token',
    //     value: checkLogin.data.access_token,
    //     httpOnly: true,
    //     path: '/', 
    //     expires: Date.now() - oneDay
    //   }) {httpOnly: true, }