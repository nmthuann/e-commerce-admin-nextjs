import { Category } from "@/types/category.interface"

export async function GetCategoryById(category_id: number): Promise<Category> {
  try {
    const URL = `${process.env.API_URL}/category/${category_id}` ;
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