import { Image } from "@/types/image.interface"

export async function GetImages(): Promise<Image[]> {
  try {
    const URL=`${process.env.NEXT_PUBLIC_API_URL}/image/get-images`
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
    };

    const res = await fetch(URL, options);

    // Xử lý kết quả từ res ở đây
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}