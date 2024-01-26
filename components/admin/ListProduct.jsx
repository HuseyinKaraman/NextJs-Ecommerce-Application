"use client";
import React, { useEffect, useState } from "react";
import { useProduct } from "@/context/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

const ListProduct = () => {
    const { products, currentPage, totalPages, setUpdatingProduct, fetchProducts } = useProduct();
    const { push } = useRouter();
    const { pathname } = usePathname();
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
                    products?.map((product, index) => (
                        <div
                            key={product._id}
                            className="relative cursor-pointer mb-5 hover:opacity-90 hover:bg-primary mx-auto border-2 border-slate-300 p-4 rounded-3xl"
                            onClick={() => handleClick(product)}
                        >
                            <Image
                                src={product.images[0]?.secure_url || "/images/default.webp"}
                                alt={product?.title}
                                width={300}
                                height={300}
                                className="!object-cover h-[200px] w-[500px] md:h-[300px] rounded-3xl mx-auto"
                            />
                            <div className="my-4">
                                <p className="text-xl font-semibold text-center">
                                    ${product?.price.toFixed(2)} {product?.title.substring(0, 50)}...
                                </p>
                            </div>
                            <p className="text-md font-semibold p-2">
                                {product.description.length > 160
                                    ? product.description.substring(0, 160) + "..."
                                    : product.description}
                            </p>
                        </div>
                    ))}
            </div>
            <div className="!text-white flex justify-center gap-x-4">
                <button
                    className="btn-primary md:mb-10"
                    onClick={() => {
                        if (currentPage > 1) {
                            fetchProducts(currentPage - 1);
                        }
                    }}
                    disabled={currentPage === 1}
                >
                    PREV
                </button>
                <button
                    className="btn-primary md:mb-10"
                    onClick={() => {
                        if (currentPage < totalPages) {
                            fetchProducts(currentPage + 1);
                        }
                    }}
                    disabled={currentPage === totalPages}
                >
                    NEXT
                </button>
            </div>
        </>
    );
};

export default ListProduct;
