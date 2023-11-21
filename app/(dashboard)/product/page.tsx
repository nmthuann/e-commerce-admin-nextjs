import { GetProducts } from "@/actions/product/get-products";
import { ProductColumn } from "./components/columns";
import { ProductsClient } from "./components/client";

const ProductsPage = async () => {
    const products = await GetProducts();
    const formattedProducts: ProductColumn[] = products.map((item) => ({
        product_id: item.product_id.toString(), // ID
        model_name: item.model_name, // model name
        category: item.category.category_name,
        vote: item.vote.toString(),
        operation_system: item.operation_system,
        hardware: item.hardware,
        is_discount: item.discount ? true : false,
        status: item.status,
        price: item.price.toString(),
        unit_price: item.unit_price.toString(),
        warranty_time: item.warranty_time.toString(),
        quantity: item.quantity.toString(),

        color: item.color,
        battery: item.battery,
        screen: item.screen,
        memory: item.memory,
        front_camera: item.front_camera,
        behind_camera: item.behind_camera,
        ram: item.ram,
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
