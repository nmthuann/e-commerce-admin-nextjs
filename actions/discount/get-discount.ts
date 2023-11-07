import { Discount } from "@/types/discount.interface";
const URL=`http://127.0.0.1:3333/discount/`

export async function GetDiscountById(discount_id: number): Promise<Discount> {
  try {
    const url = `${URL}${discount_id}`;
    const options = {
      method: 'GET',
        next: { revalidate: 0 },
    };
    const res = await fetch(url, options);
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}