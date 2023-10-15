import axios from 'axios';
import { ITask } from '@/types/task.interface';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order/get-task-orders`;

export async function GetTaskOrders(): Promise<ITask[]> {
  try {
   //  const token = localStorage.getItem('token') || ""
    const response = await axios.get(URL, {
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // }
    });

    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch data');
    // }

    // Xử lý kết quả từ response.data ở đây
    return response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
