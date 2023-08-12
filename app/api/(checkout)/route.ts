// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// import { stripe } from "@/lib/stripe";
// import axios from "axios";
// import { Product } from "@/types/product.interface";
// import { IOrder } from "@/types/order.interface";

// // import prismadb from "@/lib/prismadb";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

// export async function POST(
//   req: Request,
// //   { params }: { params: { storeId: string } }
// ) {
//   const { productIds } = await req.json();

//   if (!productIds || productIds.length === 0) {
//     return new NextResponse("Product ids are required", { status: 400 });
//   }


//     // check product  
//     const GET_PRODUCTS_URL = `${process.env.NEXT_PUBLIC_API_URL}/product/get-product-by-ids`
//     const products: Product[]  = await axios.get(GET_PRODUCTS_URL, productIds)

//   const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

//     products.forEach((product) => {
//         line_items.push({
//         quantity: 1,
//         price_data: {
//             currency: 'USD',
//             product_data: {
//             name: product.product_name,
//             },
//             unit_amount: product.price * 100
//         }
//     });
//   });


//     const CREATE_ORDER_URL = `${process.env.NEXT_PUBLIC_API_URL}/order/create-order-online`
//     const data = {
//       order: {

//       },
//       productIds
//     }
//     const order: IOrder = await axios.post(CREATE_ORDER_URL, data)
//     // await prismadb.order.create({
//     //     data: {
//     //     storeId: params.storeId,
//     //     isPaid: false,
//     //     orderItems: {
//     //         create: productIds.map((productId: string) => ({
//     //         product: {
//     //             connect: {
//     //             id: productId
//     //             }
//     //         }
//     //         }))
//     //     }
//     //     }
//     // });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: 'payment',
//     billing_address_collection: 'required',
//     phone_number_collection: {
//       enabled: true,
//     },
//     success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
//     cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
//     metadata: {
//       orderId: order.order_id
//     },
//   });

//   return NextResponse.json({ url: session.url }, {
//     headers: corsHeaders
//   });
// };