
import useAxios from "../../hooks/use-axios";

import httpClient from "../../lib/axios-instance";

// const getCategoriesUrl = 'category/get-categories'



// export const GetCategories = () => {
//     const { 
//         response: getCategoriesResponse,
//         isLoading: getCategoriesIsLoading,
//         error: getCategoriesError,
//         refetch: getRefetch } = useAxios({
//             axiosInstance: httpClient,
//             method: 'GET',
//             url: getCategoriesUrl,
//             requestConfig: {}
//         });
//     return {
//         getCategoriesResponse, 
//         getCategoriesIsLoading, 
//         getCategoriesError,
//         getRefetch
//     }
// }


export async function GetCategories() {
  const res = await fetch('http://localhost:3000/category/get-categories')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

