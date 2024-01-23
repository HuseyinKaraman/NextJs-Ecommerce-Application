"use client";
import React, { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Image from "next/image";
import PopConfirm from "@/components/ui/PopConfirm";
import { useProduct } from "@/context/product";

const ListProduct = () => {
    const [confirm, setConfirm] = useState(false);
    const { products, setUpdatingProduct, fetchProducts, deleteProduct } = useProduct();

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="table_wrapper">
            {products.length > 0 && <table className="w-full text-center text-gray-500">
                <thead className="text-xs text-gray-400 uppercase bg-secondray">
                    <tr>
                        <th scope="col" className="py-4 px-6 hidden md:block">
                            IMAGE
                        </th>
                        <th scope="col" className="py-4 px-6">
                            ID
                        </th>
                        <th scope="col" className="py-4 px-6">
                            TITLE
                        </th>
                        <th scope="col" className="py-4 px-6">
                            PRICE
                        </th>
                        <th scope="col" className="py-4 px-6">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.length > 0 &&
                        products?.map((product, index) => (
                            <tr
                                className="bg-secondray border-gray-700 hover:bg-primary transition-all cursor-pointer"
                                key={product._id}
                            >
                                <td className="py-3 md:py-4 px-1 md:px-6 font-medium whitespace-nowrap hover:text-white items-center justify-center gap-x-1 hidden md:flex">
                                    <Image src={product?.img} alt="" width={45} height={45} />
                                </td>
                                <td className="py-3 md:py-4 px-1 md:px-6 font-medium whitespace-nowrap hover:text-white">
                                    {product?._id}
                                </td>
                                <td className="py-3 md:py-4 px-1 md:px-6 font-medium whitespace-nowrap hover:text-white">
                                    {product?.title}
                                </td>
                                <td className="py-3 md:py-4 px-1 md:px-6 font-medium whitespace-nowrap hover:text-white">
                                    {product?.price}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>}
            {confirm && (
                <PopConfirm
                    setConfirm={setConfirm}
                    question="Are you sure you want to delete this product?"
                    sendRequest={deleteProduct}
                    addClass={"!bottom-24 !left-24 md:!bottom-[520px] md:!left-[450px]"}
                />
            )}
        </div>
    );
};

export default ListProduct;
