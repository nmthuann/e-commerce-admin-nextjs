import { Category } from "@/types/category.interface"
const URL=`${process.env.NEXT_PUBLIC_API_URL}/category/`

export async function GetCategoryById(category_id: number): Promise<Category> {
  try {
    const url = `${URL}${category_id}`;
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
      // Thêm các thông tin khác vào options nếu cần (headers, body, ...)
    };

    const res = await fetch(url, options);
    // Tiếp tục xử lý res như bạn đã làm trước đó
    // Ví dụ: res.json(), res.text(),...

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