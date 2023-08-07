import { ITask } from "@/types/task.interface"
const URL=`${process.env.NEXT_PUBLIC_API_URL}/order/get-task-orders`

export async function GetTaskOrders(): Promise<ITask[]> {
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
    return await res.json() ;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}