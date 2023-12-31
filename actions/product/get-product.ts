
import { Product } from "@/types/product.interface";
const URL=`http://127.0.0.1:3333/product`

export async function GetProductById(product_id: number): Promise<Product> {
  // const token = localStorage.getItem('token');
  const url = `${URL}/${product_id}`;
  try {
   
    const options = {
      method: 'GET',
    };

    const res = await fetch(url, options);
    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}