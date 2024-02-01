"use client";
import Title from "@/components/ui/Title";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";

dayjs.extend(relativeTime);

export const revalidate = 1;

async function getProducts(slug) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error("Failed to fetch product");
        }
    } catch (error) {
        toast.error("Failed to fetch product", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    }
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function ProductViewPage({ params }) {
    const product = await getProducts(params?.slug);

    return (
        <div className="w-full h-full min-h-screen bg-primary bg-opacity-55">
            <div className="container mx-auto p-4">
                <Title addClass="text-[20px] md:text-[32px] text-center font-semibold my-5">{product?.title}</Title>
                <div className="grid gap-4 lg:grid-cols-7">
                    <div className="lg:col-span-3">
                        <ProductImage  product={product}/>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-10 p-5 shadow-2xl border-4 rounded-3xl">
                        <div className="card-body">
                        <Title addClass="text-[25px] text-center font-bold my-2">Product Details</Title>
                            <div className="card-text" dangerouslySetInnerHTML={{ __html: product?.description }} />
                        </div>
                        <div className="card-footer !gap-4 !text-black !mt-auto">
                            <div className="card-footer__item !text-base ">
                                <p>Category: {product?.category?.name}</p>
                                <p>Tags: {product?.tags?.map((item) => item.name)?.join(",")}</p>
                            </div>
                            <div className="card-footer__item !text-base">
                                <p>💓Likes</p>
                                <p>Posted: {dayjs(product?.createdAt).fromNow()}</p>
                            </div>
                            <div className="card-footer__item !text-base">
                                <p>⭐Stars</p>
                                <p>Brand: {product?.brand}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid justify-center my-8">
                    <Title addClass="text-[25px] text-center font-bold my-2">Related Products</Title>
                </div>
            </div>
        </div>
    );
}
