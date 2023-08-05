import { GetProductById } from "@/actions/product/get-product";
import { ProductForm } from "./components/product-form";
import { GetDiscounts } from "@/actions/discount/get-discounts";
import { GetCategories } from "@/actions/category/get-categories";

const ProductPage = async (
    {params}: { params: { product_id: string}}
) => {
    const product = await GetProductById(parseInt(params.product_id));
    const discounts = await GetDiscounts();
    const categories = await GetCategories();
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
}

export default ProductPage;