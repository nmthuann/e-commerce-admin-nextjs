
import { Discount } from "@/types/discount.interface";
const URL=`${process.env.NEXT_PUBLIC_API_URL}/discount/`

export async function GetDiscountById(discount_id: number): Promise<Discount> {
  try {
    const url = `${URL}${discount_id}`;
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