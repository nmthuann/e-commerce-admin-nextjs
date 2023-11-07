    const URL = `http://127.0.0.1:3333/order/get-total-revenue`;

export async function GetTotalRevenue(): Promise<number> {
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
