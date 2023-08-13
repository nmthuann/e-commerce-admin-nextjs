import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order/count-product-sold`;

export async function CounttProductSold(): Promise<number> {
  try {
    const token = localStorage.getItem('token') || ""
     
        //  const cookieStore = cookies()
        // const token = cookieStore.get('token')
    const response = await axios.get(URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Giả sử API trả về dữ liệu dưới dạng JSON
    return response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
