import { format } from "date-fns";

// import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { GetProducts } from "@/actions/product/get-products";

const ProductsPage = async () => {

    const products = await GetProducts();
    const formattedProducts: ProductColumn[] = products.map((item) => ({
        product_id: item.product_id.toString(),
        product_name: item.product_name,
        category: item.__category__.category_name,
        vote: item.vote.toString(),
        brand: item.brand,
        origin: item.origin,
        isDiscount: item.__discount__ ? true : false,
        isStatus: item.status,
        price: item.price.toString(),
        unit_price: item.unit_price.toString(),
        warranty_time: item.warranty_time.toString(),
        quantity: item.quantity.toString(),
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;