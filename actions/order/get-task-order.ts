import axios from 'axios';
import { ITask } from '@/types/task.interface';

const URL = `${process.env.SERVER_URL}/order/get-task-orders`;

export async function GetTaskOrders(): Promise<ITask[]> {
  try {

    const response = await axios.get(URL);
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
