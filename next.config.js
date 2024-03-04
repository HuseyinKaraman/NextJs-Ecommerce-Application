/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXT_PUBLIC_API_URL:
            process.env.NODE_ENV === "production"
                ? "https://nextecom-dusky.vercel.app/api"
                : process.env.NEXT_PUBLIC_API_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_TAX_RATE: process.env.STRIPE_TAX_RATE,
        STRIPE_SHIPPING_RATE: process.env.STRIPE_SHIPPING_RATE,
        DOMAIN: process.env.DOMAIN,
    },
};

module.exports = nextConfig;
