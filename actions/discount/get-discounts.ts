import { Discount } from "@/types/discount.interface"
const URL=`${process.env.NEXT_PUBLIC_API_URL}/discount/get-discounts`

export async function GetDiscounts(): Promise<Discount[]> {
  try {
    // const url = `${URL}${discount_id}`;
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
    };

    const res = await fetch(URL, options);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    // Xử lý kết quả từ res ở đây
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}