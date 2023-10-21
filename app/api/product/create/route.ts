import { ErrorInput } from '@/constants/errors/errors';
import { Product } from '@/types/product.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';

const CREATE_PRRODUCT_URL=`${process.env.SERVER_URL}/product/create`
export async function POST(
  req: Request,
) {
  try {
    // const { userId } = auth(); // check token
    // if (!token) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    const body = await req.json();

    const { 
      model_name, 
      price, 
      unit_price, 
      category_id, 
      operation_system, 
      hardware, 
      discount_id, 
      status,
      color,
      battery,
      screen,
      memory,
      front_camera,
      behind_camera,
      ram
    } = body;

    console.log("HAHHAHAHHAHAH");
    


    if (!model_name) {
      return new NextResponse(`${ErrorInput.FIELD_MISSING} model_name`, { status: 400 });
    }
    
    //  call api in here
    const product= await axios.post(CREATE_PRRODUCT_URL, 
      { 
        model_name, 
        price, 
        unit_price, 
        category_id, 
        operation_system, 
        hardware, 
        discount_id, 
        status, 
        color,
        screen,
        memory,
        battery,
        front_camera,
        behind_camera,
        ram,
      });
   

    return NextResponse.json(product.data);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



// export async function GET() {
//   try {
//     const getUrl =`${process.env.NEXT_PUBLIC_API_URL}/product/get-categories`
//     const categories = await axios.get(getUrl)
//     return NextResponse.json(categories.data);
//   } catch (error) {
//     console.log('[CATEGORIES_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };