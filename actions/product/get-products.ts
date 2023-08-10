import { Product } from "@/types/product.interface"
const URL=`${process.env.NEXT_PUBLIC_API_URL}/product/get-products`

export async function GetProducts(): Promise<Product[]> {
  // const token = localStorage.getItem('token');
  try {
    // const url = `${URL}${Product_id}`;
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
      // headers: {
      //   'Authorization': `Bearer ${token}`,
      // }
      next: { revalidate: 0 },
    };

    const res = await fetch(URL, options);

    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }

    // Xử lý kết quả từ res ở đây
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}