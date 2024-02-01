"use client";
import React, { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../ui/Pagination";
import ProductCard from "../product/ProductCard";

const ListProduct = () => {
    const { products, currentPage, totalPages, setUpdatingProduct, fetchProducts } = useProduct();
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams?.get("page");

    useEffect(() => {
        fetchProducts(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleClick = (prd) => {
        setUpdatingProduct(prd);
        push("/dashboard/admin/product/newProduct");
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {products?.length > 0 &&
                    products?.map((product) => (
                        <ProductCard key={product._id} product={product} handleClick={handleClick} role="admin"/>
                    ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
    );
};

export default ListProduct;
