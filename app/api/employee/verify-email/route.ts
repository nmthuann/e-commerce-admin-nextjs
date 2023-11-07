import { MiddlewareError, StatusCode, SystemError } from '@/constants/errors/errors';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const URL=`${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/verify-email`
export async function POST(
  req: Request
) {
  try {

    // const { userId } = auth(); // check token
    
    const token = cookies().get('token')?.value;
    if(!token){
      return NextResponse.json({message: MiddlewareError.TOKEN_MISSING});
    }

    const body = await req.json();
    const { email } = body;

    const verify = await axios.post(URL, {"email": email}, {
       headers: {
          'Authorization': `Bearer ${token}` 
        }
    });
    

    // if(verify.data.message){
    //   console.log(verify.data.message)
    //   return NextResponse.json({message: verify.data.message});
    // }

    if(verify.status == 403){
      // console.log(verify.status)
      return NextResponse.json({message: verify.data.message});
    }
    return NextResponse.json(verify.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Lấy mã trạng thái HTTP từ phản hồi
        const status = axiosError.response.status;
        if (status === 403) {
          const errorMessage = {
            message: StatusCode.FORBIDDEN_403,
            error: 'Forbidden',
            statusCode: 403,
          };
          return new NextResponse(JSON.stringify(errorMessage), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
        // Xử lý các mã trạng thái khác ở đây nếu cần
        if (status === 401) {
          const errorMessage = {
            message: StatusCode.UNAUTHORIZED_401,
            error: 'unthorized',
            statusCode: 403,
          };
          return new NextResponse(JSON.stringify(errorMessage), {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }

        // Nếu không có xử lý cụ thể, bạn có thể sử dụng mã trạng thái mặc định
        return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
      }
    }
    // console.log('[VERIFY_EMAIL_POST]', error);
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
};