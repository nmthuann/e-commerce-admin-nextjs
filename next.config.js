/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    trailingSlash: true,
    images: {
        domains: [
            "tailwindui.com",
            "firebasestorage.googleapis.com",
            "res.cloudinary.com",
        ],
    },
    // generateStaticParams: function () {
    //     return {
    //         "/": { page: "/" },
    //         "/category": { page: "/category" },
    //         "/discount": { page: "/discount" },
    //         "/customer": { page: "/customer" },
    //         "/task": { page: "/task" },
    //         "/setting": { page: "/setting" },
    //         "/product": { page: "/product" },
    //         "/proudct/[product_id]": { page: "/proudct/[product_id]" },
    //     };
    // },
};

module.exports = nextConfig;
