import axios from "axios";
import { NextResponse } from "next/server";

const product_URL =  `${process.env.NEXT_PUBLIC_API_URL}/product/`;




export async function GET(
  req: Request,
  { params }: { params: { product_id: string } }
) {
    try {
        if (!params.product_id) {
        return new NextResponse("product id is required", { status: 400 });
        }
        //  call api get product by id
        const product = 
            await axios.get(`${product_URL}${parseInt(params.product_id as string)}`);
        return NextResponse.json(product.data);
    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function DELETE(
    req: Request,
 { params }: { params: { product_id: string} }
) {
  try {
    // const { userId } = auth();  // -> get token
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    // if (!params.product_id) {
    //   return new NextResponse("product id is required", { status: 400 });
    // }

    // console.log("Imherenow", params.product_id)
    await axios.delete(
         `${product_URL}delete/${parseInt(params.product_id as string)}`
    ) 
    return NextResponse.json({message: `product with id ${params.product_id} is deleted`});
  } catch (error) {
    console.log('[product_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PUT(
  req: Request,
  { params }: { params: { product_id: string} }
) {
  try {   
    // const { userId } = auth();  // -> check token

    const body = await req.json();
    
    const { product_name, description } = body;
    
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!description) {
      return new NextResponse("Description ID is required", { status: 400 });
    }

    if (!product_name) {
      return new NextResponse("product name is required", { status: 400 });
    }

    if (!params.product_id) {
      return new NextResponse("product id is required", { status: 400 });
    }

   
        //  call api in here
        const product = 
            await axios.put(
                `${product_URL}update/${parseInt(params.product_id as string)}`, 
                {product_name, description}
            );
        console.log("product:::::",product.data);
        return NextResponse.json(product.data);
    } catch (error) {
        console.log('[CATEGORIES_PUT]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};