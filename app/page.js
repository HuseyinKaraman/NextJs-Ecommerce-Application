"use client";
import ProductCard from "@/components/product/ProductCard";
import Pagination from "@/components/Pagination";
import Title from "@/components/ui/Title";
import axios from "axios";

// export const revalidate = 10; //revalidate every 10 seconds


async function getProducts(searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams?.page || 1,
    }).toString();
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product?${searchQuery}`);

    if (res.status !== 200) {
        throw new Error("Failed to fetch products");
    }

    return res.data;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page({ searchParams }) {
    const { products, currentPage, totalPages } = await getProducts(searchParams);

    return (
        <div className="container mx-auto p-2">
            <Title addClass="text-[40px] text-center font-bold my-2">Latest Products</Title>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                {products?.length > 0 &&
                    products?.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}
