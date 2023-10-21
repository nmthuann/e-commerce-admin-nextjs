import { GetProductById } from "@/actions/product/get-product";
import { GetDiscounts } from "@/actions/discount/get-discounts";
import { GetCategories } from "@/actions/category/get-categories";
import { CreateProductForm } from "./components/create-product-form";

const CreateProductPage = async () => {
    // let product = null;
    // console.log(params.product_id);
    // if (params.product_id != "create") {
    //     // discount = await GetDiscountById(parseInt(params.discount_id));
    //     product = await GetProductById(parseInt(params.product_id, 10));
    // }
    const discounts = await GetDiscounts();
    const categories = await GetCategories();

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CreateProductForm
                    categories={categories}
                    discounts={discounts}
                />
            </div>
        </div>
    );
};

export default CreateProductPage;
