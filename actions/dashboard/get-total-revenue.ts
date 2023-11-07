    const URL = `${process.env.API_URL}/order/get-total-revenue`;

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
