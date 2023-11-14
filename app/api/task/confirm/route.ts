import { MiddlewareError, StatusCode, SystemError } from '@/constants/errors/errors';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const URL=`http://localhost:3333/order/update-confirmed/`
export async function POST(
  req: Request
) {
  try {
    
    const token = cookies().get('token')?.value;
    if(!token){
      return NextResponse.json({message: MiddlewareError.TOKEN_MISSING});
    }

    const {order_id} = await req.json();

    console.log("CONFIRMED::::",`${URL}${parseInt(order_id, 10)}`)

    const updateStatus = await axios.patch(`${URL}${parseInt(order_id, 10)}`,{}, {
       headers: {
          'Authorization': `Bearer ${token}` 
        }
    });
    
    return NextResponse.json(updateStatus.data);
  } catch (error) {
    console.log(error)
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
}


// if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       if (axiosError.response) {
//         // Lấy mã trạng thái HTTP từ phản hồi
//         const status = axiosError.response.status;
//         if (status === 403) {
//           const errorMessage = {
//             message: StatusCode.FORBIDDEN_403,
//             error: 'Forbidden',
//             statusCode: 403,
//           };
//           return new NextResponse(JSON.stringify(errorMessage), {
//             status: 403,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//         }
//         // Xử lý các mã trạng thái khác ở đây nếu cần
//         if (status === 401) {
//           const errorMessage = {
//             message: StatusCode.UNAUTHORIZED_401,
//             error: 'unthorized',
//             statusCode: 403,
//           };
//           return new NextResponse(JSON.stringify(errorMessage), {
//             status: 401,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//         }

//         // Nếu không có xử lý cụ thể, bạn có thể sử dụng mã trạng thái mặc định
//         return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
//       }
//     }
//     // console.log('[VERIFY_EMAIL_POST]', error);
//     return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
//   }