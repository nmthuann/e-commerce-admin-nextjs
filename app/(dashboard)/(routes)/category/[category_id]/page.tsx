// import prismadb from "@/lib/prismadb";

import { GetCategoryById } from "@/actions/category/get-category";
import { CategoryForm } from "./components/category-form";
// export const revalidate = 0;
const CategoryPage = async ({
  params
}: {
  params: { category_id: number }
}) => {
  const category = await GetCategoryById(params.category_id);
  console.log(params.category_id) // { params: { category_id: 'new' }, searchParams: {} }

  // const billboards = await prismadb.billboard.findMany({
  //   where: {
  //     storeId: params.storeId
  //   }
  // });



  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm  initialData={category} /> 
        {/* billboards={billboards} */}
      </div>
    </div>
  );
}

export default CategoryPage;