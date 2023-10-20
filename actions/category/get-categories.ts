
// import useAxios from "../../hooks/use-axios";

import { SystemError } from "@/constants/errors/errors"
import { Category } from "@/types/category.interface"

// import httpClient from "../../lib/axios-instance";
//
// const getCategoriesUrl = 'category/get-categories'
//
//
//
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


const URL=`${process.env.SERVER_URL}/category/get-categories`
export async function GetCategories(): Promise<Category []> {
  const res = await fetch(URL,
  {
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
 
  return await res.json()
}

