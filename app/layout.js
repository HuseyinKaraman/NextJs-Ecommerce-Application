"use client";
import "./globals.css";
import Header from "@/components/ui/Header";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";
import { CartProvider } from "@/context/cart"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
                />
            </head>
            <SessionProvider>
                <CategoryProvider>
                    <TagProvider>
                        <ProductProvider>
                            <CartProvider>
                            <body>
                                <ToastContainer />
                                <Header />
                                {children}
                            </body>
                            </CartProvider>
                        </ProductProvider>
                    </TagProvider>
                </CategoryProvider>
            </SessionProvider>
        </html>
    );
}
