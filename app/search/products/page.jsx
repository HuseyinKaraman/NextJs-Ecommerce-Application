"use client";
import React, { useEffect } from "react";
import { useProduct } from "@/context/product";
import ProductCard from "@/components/product/ProductCard";
import Title from "@/components/ui/Title";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const SearchProductsPage = () => {
    const { setProductSearchQuery, productSearchResults, setProductSearchResults } = useProduct();
    const productSearchParams = useSearchParams();
    const query = productSearchParams?.get("productSearchQuery");

    useEffect(() => {
        const fetchProductSearchResultsOnLoad = async (query) => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/search/products?productSearchQuery=${query}`
                );

                if (res.status !== 200) {
                    throw new Error("Network response was not ok for search results");
                }

                setProductSearchResults(res?.data?.products);
            } catch (error) {
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        };

        if (query) {
            setProductSearchQuery(query);
            fetchProductSearchResultsOnLoad(query);
        }
    }, [query, setProductSearchQuery, setProductSearchResults]);

    return (
        <div className="container mx-auto w-[80%]">
            <Title addClass="text-[30px] font-semibold my-2">Search Results {productSearchResults?.length}</Title>
            <hr className="mb-4" />
            <div className="flex flex-wrap items-start h-[87vh] gap-3 overflow-y-auto scroll-bar px-2 mb-3">
                {productSearchResults?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchProductsPage;
