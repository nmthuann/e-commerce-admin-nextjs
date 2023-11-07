import { ITask } from '@/types/task.interface';

export async function GetTaskOrders(): Promise<ITask[]> {
  try {
    const URL = `${process.env.NEST_PUBLIC_API_URL}/order/get-task-orders`;
    const options = {
      method: 'GET',
    };
    const res = await fetch(URL, options);
    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
