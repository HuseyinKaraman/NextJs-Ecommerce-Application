import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

export const metadata = {
    title: "Nextecom",
    description: "Ecommerce app useing NextJs Full Stack",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <SessionProvider>
                <body>
                    <ToastContainer />
                    <Header />
                    {children}
                </body>
            </SessionProvider>
        </html>
    );
}
