import { Discount } from "@/types/discount.interface"
const URL=`http://127.0.0.1:3333/discount/get-discounts`

export async function GetDiscounts(): Promise<Discount[]> {
  try {
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
        next: { revalidate: 0 },
    };
    
    const res = await fetch(URL, options);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}