import { Category } from '@/types/category.interface';
import axios from 'axios';
import { NextResponse } from 'next/server';

const URL=`${process.env.NEXT_PUBLIC_API_URL}/category/create`
export async function POST(
  req: Request,
) {
  try {
    // const { userId } = auth(); // check token

    const body = await req.json();

    const { category_name, description } = body;

    // if (!token) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!category_name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!description) {
      return new NextResponse("description is  required", { status: 400 });
    }

    //  call api in here
    const category= await axios.post(URL, {category_name, description});
    console.log("category:::::",category.data)
    return NextResponse.json(category.data);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



export async function GET() {
  try {
    const getUrl =`${process.env.NEXT_PUBLIC_API_URL}/category/get-categories`
    const categories = await axios.get(getUrl)
    return NextResponse.json(categories.data);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};