import { Payment } from "@/types/payment.interface";
const URL=`${process.env.NEXT_PUBLIC_API_URL}/payment/get-payments`

export async function GetPayments(): Promise<Payment[]> {
  try {
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