// import prismadb from "@/lib/prismadb";

import { GetCategoryById } from "@/actions/category/get-category";
import { CategoryForm } from "@/app/(dashboard)/category/[category_id]/components/category-form";
import { useParams } from "next/navigation";
// export const revalidate = 0;
const CategoryPage = async ({
    params,
}: {
    params: { category_id: string };
}) => {
    // const params = useParams();
    let category = null;
    if (params.category_id.toString() != "create") {
        category = await GetCategoryById(parseInt(params.category_id, 10));
    }

    console.log(":::category/:id/page.tsx:::", params.category_id); // { params: { category_id: 'new' }, searchParams: {} }

    // const billboards = await prismadb.billboard.findMany({
    //   where: {
    //     storeId: params.storeId
    //   }
    // });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initialData={category} />
                {/* billboards={billboards} */}
            </div>
        </div>
    );
};

export default CategoryPage;
