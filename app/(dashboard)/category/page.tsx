import { CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";

import { Category } from "@/types/category.interface";
import { GetCategories } from "@/actions/category/get-categories";

const CategoriesPage = async () => {
    const categories = await GetCategories();
    // const categories: Category = getCategoriesResponse;
    //console.log("sss",params.category_id)
    const formattedCategories: CategoryColumn[] | undefined = categories.map(
        (item: Category) => ({
            category_id: String(item.category_id),
            category_name: item.category_name,
            description: item.description,
            category_url: item.category_url,
            createdAt: String(item.createdAt),
        })
    );

    console.log(formattedCategories);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
