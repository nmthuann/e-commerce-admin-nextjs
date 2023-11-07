import axios from "axios";
import { NextResponse } from "next/server";

const discount_URL =  `http://127.0.0.1:3333/discount/`;

export async function GET(
  req: Request,
  { params }: { params: { discount_id: string } }
) {
    try {
        if (!params.discount_id) {
        return new NextResponse("discount id is required", { status: 400 });
        }

        //  call api get discount by id
        const discount = 
            await axios.get(`${discount_URL}${parseInt(params.discount_id as string)}`);
        return NextResponse.json(discount.data);
    } catch (error) {
        console.log('[DISCOUNT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function DELETE(
    req: Request,
 { params }: { params: { discount_id: string} }
) {
  try {
    // const { userId } = auth();  // -> get token
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!params.discount_id) {
      return new NextResponse("discount id is required", { status: 400 });
    }

    // console.log("Imherenow", params.discount_id)
    await axios.delete(
         `${discount_URL}delete/${parseInt(params.discount_id as string)}`
    ) 
    return NextResponse.json({message: `discount with id ${params.discount_id} is deleted`});
  } catch (error) {
    console.log('[DISCOUNT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PUT(
  req: Request,
  { params }: { params: { discount_id: string} }
) {
  try {   
    // const { userId } = auth();  // -> check token

    const body = await req.json();
    
    const { description, expired, percent } = body;
    
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!expired) {
      return new NextResponse("expired name is required", { status: 400 });
    }

    if (!percent) {
      return new NextResponse("percent name is required", { status: 400 });
    }

    if (!params.discount_id) {
      return new NextResponse("discount id is required", { status: 400 });
    }

   
        //  call api in here
      const discount = 
            await axios.put(
                `${discount_URL}update/${parseInt(params.discount_id as string)}`, 
                { description, expired, percent }
            );
        console.log("discount:::::",discount.data);
        return NextResponse.json(discount.data);
    } catch (error) {
        console.log('[DISCOUNTS_PUT]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};