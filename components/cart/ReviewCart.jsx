+"use client";
import React from "react";
import Title from "@/components/ui/Title";
import { useCart } from "@/context/cart";
import Image from "next/image";
import AddToCart from "../product/AddToCart";
import Link from "next/link";
import OrderSummary from "./OrderSummary";

const ReviewCart = ({ onNextStep }) => {
    const { cartItems } = useCart();

    return (
        <div className="px-4 lg:px-10 grid grid-cols-12 justify-center gap-5">
            <div className="flex flex-col justify-start col-span-12 lg:col-span-7">
                <Title addClass={"text-[22px] bg-blue-200 mb-4 p-2 text-white"}>Review Cart / Adjust Quantity</Title>
                <div className="flex flex-col gap-7 px-2 py-2">
                    {cartItems?.length > 0 &&
                        cartItems?.map((product, index) => (
                            <div className="grid grid-cols-12 w-full shadow-lg-2" key={product._id}>
                                <div className="col-span-4 relative h-[240px] overflow-hidden">
                                    <Image
                                        src={product?.images[0].secure_url || "/images/default.webp"}
                                        alt={product?.title}
                                        width={300}
                                        height={300}
                                        className="h-full w-full !object-cover"
                                    />
                                </div>
                                <div className="col-span-8 flex flex-col  px-2 gap-2 mb-2">
                                    <Link
                                        href={`/product/${product?.slug}`}
                                        className="text-blue-400 text-[12px] md:text-lg hover:underline"
                                    >
                                        {product?.title}
                                    </Link>
                                    <div className="text-[18px] font-serif">{product?.price.toFixed(2)}$</div>
                                    <div
                                        className="text-[12px] md:text-bas"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                product?.description?.length > 160
                                                    ? product?.description.substring(0, 160) + "..."
                                                    : product?.description,
                                        }}
                                    />
                                    <div className="mb-1 mt-auto">
                                        <AddToCart product={product} reviewAndCheckout={false} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="flex justify-end col-span-12 my-4">
                    <button className="btn !rounded-md !bg-red-600 !w-1/2" onClick={onNextStep}>
                        Next
                    </button>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-5 mb-10">
                <OrderSummary />
            </div>
        </div>
    );
};

export default ReviewCart;
