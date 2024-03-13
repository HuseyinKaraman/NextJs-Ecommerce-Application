// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware"; // role girince bu kullanıldı
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/dashboard/:path*", "/dashboard/admin/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

export default withAuth(
    async function middleware(req,res) {
        const url = req.nextUrl.pathname;
        const userRole = req?.nextauth?.token?.user?.role;

        // add the CORS headers to the response
        res.headers.append("Access-Control-Allow-Credentials", "true");
        res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
        res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
        res.headers.append(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        );

        if (url.includes("/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);
