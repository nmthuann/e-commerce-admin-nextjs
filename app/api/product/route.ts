import { Product } from '@/types/product.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';

const URL=`${process.env.NEXT_PUBLIC_API_URL}/product/create`
export async function POST(
  req: Request,
) {
  try {
    // const { userId } = auth(); // check token

    const body = await req.json();

    const { product_name, price, unit_price, category_id, brand, origi, discount_id, status } = body;

    // if (!token) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!product_name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    // if (!description) {
    //   return new NextResponse("description is  required", { status: 400 });
    // }

    //  call api in here
    const product= await axios.post(URL, { product_name, price, unit_price, category_id, brand, origi, discount_id, status});
    console.log("product:::::",product.data)
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