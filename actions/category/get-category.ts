import { Category } from "@/types/category.interface"
import 'server-only'

export async function GetData(category_id: number): Promise<Category> {
  try {
    const URL = `http://127.0.0.1:3333/category/${category_id}` ;
    const options = {
      method: 'GET',
      // Thêm các thông tin khác vào options nếu cần (headers, body, ...)
      next: { revalidate: 0 },
    };
    const res = await fetch(URL, options);
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}