/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI:process.env.MONGODB_URI,
        NEXT_PUBLIC_API_URL:process.env.NODE_ENV === 'production' ? 'https://nextecom-dusky.vercel.app/api' : process.env.NEXT_PUBLIC_API_URL,
        NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
        CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    }
}

module.exports = nextConfig
