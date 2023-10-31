
export async function CountProductSold(): Promise<number> {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/order/count-product-sold`;
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
