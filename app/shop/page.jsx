"use client";
import ProductFilter from "@/components/product/ProductFilter";
import axios from "axios";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/product/ProductCard";
import Title from "@/components/ui/Title";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams.page || 1,
        minPrice: searchParams.minPrice || "",
        maxPrice: searchParams.maxPrice || "",
        ratings: searchParams.ratings || "",
        category: searchParams.category || "",
        tag: searchParams.tag || "",
        brand: searchParams.brand || "",
    }).toString();

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/filters?${searchQuery}`);

        if (res.status !== 200) {
            throw new Error("Failed to fetch products");
        } else if (!res.data || !Array.isArray(res.data?.products)) {
            throw new Error("No products found");
        }

        return res.data;
    } catch (error) {
        console.log(error);
        return {
            products: [],
            currentPage: 1,
            totalPages: 1,
        };
    }
}

// eslint-disable-next-line @next/next/no-async-client-component
const Shop = async ({ searchParams }) => {
    // console.log("searchParams in shop page", searchParams);
    const {products, currentPage, totalPages} = await getProducts(searchParams);

    return (
            <div className="p-1 grid grid-cols-12">
                <div className="col-span-12 lg:col-span-3 xl:col-span-3 xl:max-w-[350px] max-h-[90vh] overflow-y-auto scroll-bar">
                    <ProductFilter searchParams={searchParams} />
                </div>
                <div className="col-span-12 lg:col-span-9 xl:col-span-9">
                    <Title addClass="text-[30px] text-center font-bold my-2">Shop Latest Products</Title>
                    <div className="flex flex-wrap justify-evenly h-[87vh] gap-3 px-1 overflow-y-auto scroll-bar mb-3">
                        {
                            products?.map((product) => (
                                <div className="sm:w-[49%] md:w-[49%] lg:w-[45%] xl:w-[45%] 2xl:w-[30%]" key={product._id}>
                                    <ProductCard product={product}/>
                                </div>
                            ))
                        }

                    </div>
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
            </div>
    );
};

export default Shop;
