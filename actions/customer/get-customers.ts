import { ICustomer} from "@/types/customer.interface";
const URL=`${process.env.API_URL}/order/get-customer-list`

export async function GetCustomerList(): Promise<ICustomer[]> {
  try {
    // const url = `${URL}${discount_id}`;
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
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