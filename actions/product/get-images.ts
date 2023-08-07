import { Image } from "@/types/image.interface"
const URL=`${process.env.NEXT_PUBLIC_API_URL}/Image/get-images`

export async function GetImages(): Promise<Image[]> {
  // const token = localStorage.getItem('token');
  try {
    // const url = `${URL}${Image_id}`;
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
      // headers: {
      //   'Authorization': `Bearer ${token}`,
      // }
    };

    const res = await fetch(URL, options);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    // Xử lý kết quả từ res ở đây
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}