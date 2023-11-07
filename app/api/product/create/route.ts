import { ErrorInput, MiddlewareError, ProductError, SystemError } from '@/constants/errors/errors';
import { Messages } from '@/constants/notifications/message';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const CREATE_PRRODUCT_URL=`http://127.0.0.1:3333/product/create`
const CREATE_IMAGES_URL = `http://127.0.0.1:3333/image/insert-images` //:product_id


class ImageDto{
  url!: string;
}

class CreateProductDto{
  images!: ImageDto[];
  model_name!: string;
  quantity!: number;
  category_id!: number;
  price!: number;
  unit_price!: number;
  discount_id!: number;
  operation_system!: string;
  hardware!: string;
  color!: string;
  battery!: number;
  front_camera!: number;
  behind_camera!: number;
  screen!: number;
  memory!: number;
  ram!: number;
  description!: string;
}


export async function POST(
  req: Request,
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

  
    // //  CHECK DUPLICATE
    // const data = {
    //   model_name,
    //   hardware,
    //   color,
    //   screen,
    //   battery,
    //   memory,
    //   front_camera,
    //   behind_camera,
    //   ram,
    // }
    // console.log("DATA:::::", data);

    // const checkProductDuplicate = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/get-product-duplicate`,  
    //   data
    // );
    // if (checkProductDuplicate.data === ProductError.PRODUCT_DUPLICATE) {

    //   return new NextResponse(ProductError.PRODUCT_DUPLICATE,{status: 400});
    // }
    
    //  call api in here
    const product = await axios.post(CREATE_PRRODUCT_URL, 
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
        return NextResponse.json(product.data); // new   //NextResponse(ProductError.PRODUCT_DUPLICATE, {status: 400});
      }

      if(images){
        const createImages = 
            await axios.post(`${CREATE_IMAGES_URL}/${await product.data.product_id}`,images,{
              headers: {
                  'Authorization': `Bearer ${token}` 
              }
            });
                // console.log("OKKKK",images)

      }
     
    return new NextResponse(JSON.stringify(Messages.CREATE_PRODUCT_SUCCESS), {status: 200}); //product.data
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse(SystemError.INTERNAL_SERVER_ERROR, { status: 500 });
  }
};