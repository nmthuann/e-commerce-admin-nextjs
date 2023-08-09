const URL=`${process.env.NEXT_PUBLIC_API_URL}/order/count-product-sold`
export async function CounttProductSold(): Promise<number> {
  try {
    const options = {
      method: 'GET',
    };

    const res = await fetch(URL, options);
    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }
    return await res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}