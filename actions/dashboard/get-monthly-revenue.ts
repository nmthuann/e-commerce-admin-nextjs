export interface GraphData {
  name: string;
  total: number;
}

interface RevenueByMonth{

   [month: string]: number;
}
async function getRevenueByMonth(): Promise<RevenueByMonth> {
  try {
    const URL=`http://127.0.0.1:3333/order/get-revenue-by-month`
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



export const getGraphRevenue = async (): Promise<GraphData[]> => {

    const aggregatedRevenue = await getRevenueByMonth();
    console.log("aggregatedRevenue", aggregatedRevenue)
    const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];


for (const key in aggregatedRevenue) {
  if (aggregatedRevenue.hasOwnProperty(key)) {
    const month = parseInt(key, 10)+1;
    const total = aggregatedRevenue[key];
    
    switch (month) {
      case 1:
        graphData[0].total = total;
        break;
      case 2:
        graphData[1].total = total;
        break;
      case 3:
        graphData[2].total = total;
        break;
      case 4:
        graphData[3].total = total;
        break;
      case 5:
        graphData[4].total = total;
        break;
      case 6:
        graphData[5].total = total;
        break;
      case 7:
        graphData[6].total = total;
        break;
      case 8:
        graphData[7].total = total;
        break;
      case 9:
        graphData[8].total = total;
        break;
      case 10:
        graphData[9].total = total;
        break;
      case 11:
        graphData[10].total = total;
        break;
      case 12:
        graphData[11].total = total;
        break;
      default:
        break;
      }
    }
  }

  console.log(graphData);

  return graphData;
};