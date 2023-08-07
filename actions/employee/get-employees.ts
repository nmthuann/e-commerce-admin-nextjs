import { IGetEmployeeList} from "@/types/employee.interface";
const URL=`${process.env.NEXT_PUBLIC_API_URL}/employee/get-employee-list`

export async function GetEmployeeList(): Promise<IGetEmployeeList[]> {
  try {
    // const url = `${URL}${discount_id}`;
    const options = {
      method: 'GET', // Chỉ định phương thức là GET
    };

    const res = await fetch(URL, options);

    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }

    // Xử lý kết quả từ res ở đây
    return res.json();

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}