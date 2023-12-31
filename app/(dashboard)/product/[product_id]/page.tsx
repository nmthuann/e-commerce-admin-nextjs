import { GetProductById } from "@/actions/product/get-product";
import { ProductForm } from "./components/product-form";
import { GetDiscounts } from "@/actions/discount/get-discounts";
import { GetCategories } from "@/actions/category/get-categories";

const ProductPage = async ({ params }: { params: { product_id: string } }) => {
    // let product = null;
    // console.log(params.product_id);
    // if (params.product_id != "create") {
    //     // discount = await GetDiscountById(parseInt(params.discount_id));
    //     product = await GetProductById(parseInt(params.product_id, 10));
    // }
    const categories = await GetCategories();
    const discounts = await GetDiscounts();
    const product = await GetProductById(parseInt(params.product_id, 10));
    // const Images = await GetImages();

    console.log("categories", categories);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    categories={categories}
                    discounts={discounts}
                    initialData={product}
                />
            </div>
        </div>
    );
};

export default ProductPage;

// export async function getStaticPaths() {
//     return {
//         paths: [{ params: { product_id: 1 } }],
//         fallback: false,
//     };
// }
