const URL = `http://localhost:3333/order/statistical-category-by-order`;

export async function statisticalCategoryByOrder(): Promise<any[]> {
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
