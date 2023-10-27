
 
import { AuthExceptionMessages, ErrorInput, SystemError } from '@/constants/errors/errors';
import { Messages } from '@/constants/notifications/message';
import axios from 'axios';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
 
export async function POST(
  req: Request,
) {
    try {
        console.log("get here");
        const token = cookies().get('token')?.value;
        if(token){
            cookies().delete('token');
            return new NextResponse(Messages.LOGOUT_SUCCESS, { status: 200 });
        }
        return new NextResponse(Messages.LOGOUT_SUCCESS, { status: 200 });
    } catch (error) {
        throw new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
    }
}