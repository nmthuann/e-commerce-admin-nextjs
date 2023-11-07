import { MiddlewareError, ProductError, SystemError } from "@/constants/errors/errors";
import { Messages } from "@/constants/notifications/message";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const product_URL =  `http://127.0.0.1:3333/product/`;
const UPDATE_PRRODUCT_URL=`http://127.0.0.1:3333/product/update`
const UPDATE_IMAGES_URL = `http://127.0.0.1:3333/image/update-images` //:product_id


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
    // const { userId } = auth(); // check token
     const token = cookies().get('token')?.value;
    if(!token){
      return NextResponse.json({message: MiddlewareError.TOKEN_MISSING});
    }
    const body = await req.json();

    const { 
      images,
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
      ram,
      description,
      warranty_time,
      quantity
     
    } = body;

    
    //  call api in here
    const product = await axios.put(`${UPDATE_PRRODUCT_URL}/${parseInt(params.product_id as string)}`, 
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
        description,
        warranty_time,
        quantity
      }, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if(!product){
        throw new NextResponse(JSON.stringify(ProductError.PRODUCT_CREATE_FAILED), {status: 400});
      }

      if(await product.data.message ){
        // console.log(await product.data)
        return NextResponse.json(product.data); 
      }

      if(images){
        const updateImages = 
            await axios.post(`${UPDATE_IMAGES_URL}/${await product.data.product_id}`,images, {
              headers: {
                  'Authorization': `Bearer ${token}` 
              }
            });
        console.log(await updateImages.data)
      }
     
    return new NextResponse(JSON.stringify(Messages.CREATE_PRODUCT_SUCCESS), {status: 200}); //product.data
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
};

// export async function PUT(
//   req: Request,
//   { params }: { params: { product_id: string} }
// ) {
//   try {   
//     // const { userId } = auth();  // -> check token

//     const body = await req.json();
    
//     const { product_name, description } = body;
    
//     // if (!userId) {
//     //   return new NextResponse("Unauthenticated", { status: 403 });
//     // }

//     if (!description) {
//       return new NextResponse("Description ID is required", { status: 400 });
//     }

//     if (!product_name) {
//       return new NextResponse("product name is required", { status: 400 });
//     }

//     if (!params.product_id) {
//       return new NextResponse("product id is required", { status: 400 });
//     }

   
//         //  call api in here
//         const product = 
//             await axios.put(
//                 `${product_URL}update/${parseInt(params.product_id as string)}`, 
//                 {product_name, description}
//             );
//         console.log("product:::::",product.data);
//         return NextResponse.json(product.data);
//     } catch (error) {
//         console.log('[CATEGORIES_PUT]', error);
//         return new NextResponse("Internal error", { status: 500 });
//     }
// };