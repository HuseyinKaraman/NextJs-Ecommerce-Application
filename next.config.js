/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI:process.env.MONGODB_URI,
        NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' ? 'https://nextecom-server.vercel.app' : process.env.NEXT_PUBLIC_API_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    }
}

module.exports = nextConfig
