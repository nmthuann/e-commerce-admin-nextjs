// "use client";

// import { ShoppingCart } from "lucide-react";

// import Currency from "@/components/ui/currency";

// // import useCart from "@/hooks/use-cart";
// import { Product } from "@/types/product.interface";

// interface InfoProps {
//     data: Product[];
// }

// const Info: React.FC<InfoProps> = ({ data }) => {
//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//                 {data.model_name}
//             </h1>
//             <div className="mt-3 flex items-end justify-between">
//                 <p className="text-2xl text-gray-900">
//                     <Currency value={data?.price} />
//                 </p>
//             </div>
//             <hr className="my-4" />
//             <div className="flex flex-col gap-y-6">
//                 <div className="flex items-center gap-x-4">
//                     <h3 className="font-semibold text-black">Model Name:</h3>
//                     <div>{data?.model_name}</div>
//                 </div>
//                 <div className="flex items-center gap-x-4">
//                     <h3 className="font-semibold text-black">Color:</h3>
//                     <div
//                         className="h-6 w-6 rounded-full border border-gray-600"
//                         style={{ backgroundColor: data?.color }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Info;

// Import necessary libraries and components
import { ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { Product } from "@/types/product.interface";

// Define the interface for the component props
interface InfoProps {
    data: Product[]; // Now data is an array of products
}

// Define the Info component
const Info: React.FC<InfoProps> = ({ data }) => {
    // Ensure data is available before rendering
    if (!data || data.length === 0) {
        return null; // or render a loading state/error message
    }

    return (
        <div>
            {/* Map through the array and render information for each product */}
            {data.map((product) => (
                <div key={product.product_id}>
                    {/* Display product name */}
                    <h1 className="text-3xl font-bold text-gray-900">
                        {product.model_name}
                    </h1>
                    <div className="mt-3 flex items-end justify-between">
                        {/* Display product price using the Currency component */}
                        <p className="text-2xl text-gray-900">
                            <Currency value={product.price} />
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col gap-y-6">
                        {/* Display model name */}
                        <div className="flex items-center gap-x-4">
                            <h3 className="font-semibold text-black">
                                Model Name:
                            </h3>
                            <div>{product.model_name}</div>
                        </div>
                        {/* Display color */}
                        <div className="flex items-center gap-x-4">
                            <h3 className="font-semibold text-black">Color:</h3>
                            {/* Use a div with a background color to represent the color */}
                            <div
                                className="h-6 w-6 rounded-full border border-gray-600"
                                style={{ backgroundColor: product.color }}
                            />
                        </div>
                    </div>
                    {/* Add any additional markup or styling as needed */}
                </div>
            ))}
        </div>
    );
};

// Export the Info component
export default Info;
