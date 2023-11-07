import axios from "axios";
import { NextResponse } from "next/server";

const category_URL =  `${process.env.NEXT_PUBLIC_VERCEL_URL}/category/`;




export async function GET(
  req: Request,
  { params }: { params: { category_id: string } }
) {
    try {
        if (!params.category_id) {
        return new NextResponse("Category id is required", { status: 400 });
        }
        //  call api get category by id
        const category = 
            await axios.get(`${category_URL}${parseInt(params.category_id as string)}`);
        return NextResponse.json(category.data);
    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function DELETE(
    req: Request,
 { params }: { params: { category_id: string} }
) {
  try {
    // const { userId } = auth();  // -> get token
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    // if (!params.category_id) {
    //   return new NextResponse("Category id is required", { status: 400 });
    // }

    // console.log("Imherenow", params.category_id)
    await axios.delete(
         `${category_URL}delete/${parseInt(params.category_id as string)}`
    ) 
    return NextResponse.json({message: `category with id ${params.category_id} is deleted`});
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PUT(
  req: Request,
  { params }: { params: { category_id: string} }
) {
  try {   
    // const { userId } = auth();  // -> check token

    const body = await req.json();
    
    const { category_name, description } = body;
    
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!description) {
      return new NextResponse("Description ID is required", { status: 400 });
    }

    if (!category_name) {
      return new NextResponse("category name is required", { status: 400 });
    }

    if (!params.category_id) {
      return new NextResponse("Category id is required", { status: 400 });
    }

   
        //  call api in here
        const category = 
            await axios.put(
                `${category_URL}update/${parseInt(params.category_id as string)}`, 
                {category_name, description}
            );
        console.log("category:::::",category.data);
        return NextResponse.json(category.data);
    } catch (error) {
        console.log('[CATEGORIES_PUT]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};