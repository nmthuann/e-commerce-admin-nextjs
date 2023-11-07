
export async function CountProductSold(): Promise<number> {
  try {
    const URL = `http://127.0.0.1:3333/order/count-product-sold`;
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
