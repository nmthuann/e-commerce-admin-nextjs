/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "tailwindui.com",
            "firebasestorage.googleapis.com",
            "res.cloudinary.com",
        ],
    },
};

module.exports = nextConfig;
