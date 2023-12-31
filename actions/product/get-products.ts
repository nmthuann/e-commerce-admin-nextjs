import { Product } from "@/types/product.interface"
const URL=`http://127.0.0.1:3333/product/get-products`

export async function GetProducts(): Promise<Product[]> {
  
  try {
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
      next: { revalidate: 0 },
    };

    const res = await fetch(URL, options);

    // Xử lý kết quả từ res ở đây
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}




 // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }

// const token = localStorage.getItem('token');