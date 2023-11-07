import { Shipping } from "@/types/shipping.interface";

export async function GetShippings(): Promise<Shipping[]> {
  try {
    const URL=`http://127.0.0.1:3333/shipping/get-shippings`
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
    };

    const res = await fetch(URL, options);

    // Xử lý kết quả từ res ở đây
    return await res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}