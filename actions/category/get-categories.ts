import { SystemError } from "@/constants/errors/errors"
import { Category } from "@/types/category.interface"


const URL=`${process.env.NEXT_PUBLIC_VERCEL_URL}/category/get-categories` || `http://localhost:3333/category/get-categories`
export async function GetCategories(): Promise<Category []> {
  const res = await fetch(URL,
  {
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
 
  return await res.json()
}

