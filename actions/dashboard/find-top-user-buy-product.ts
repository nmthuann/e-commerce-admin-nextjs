const URL = `http://localhost:3333/order/find-top-user-buy-product`;

export async function findTopUserBuyProduct(): Promise<any[]> {
  try {
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
