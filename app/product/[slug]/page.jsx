"use client";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import Title from "@/components/ui/Title";
import UserReviews from "@/components/product/UserReviews";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import CouponCode from "@/components/product/CouponCode";
import AddToCart from "@/components/product/AddToCart";

dayjs.extend(relativeTime);

// export const revalidate = 1;

// export async function generateMetadata({ params }) {
//     const product = await getProduct(params?.slug);

//     return {
//         title: product?.title,
//         description: product?.description.substring(0, 160),
//         openGraph: {
//             image: product?.images[0]?.secure_url,
//         },
//     };
// }

async function getProduct(slug) {
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
    const product = await getProduct(params?.slug);

    return (
        <div className="w-full h-full min-h-screen bg-primary bg-opacity-55">
            <div className="container mx-auto p-4 relative">
                <Title addClass="text-[20px] md:text-[32px] text-center font-semibold my-5">{product?.title}</Title>
                <div className="grid gap-4 lg:grid-cols-7">
                    <div className="lg:col-span-3">
                        <ProductImage product={product} />
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-10 p-5 shadow-2xl border-4 rounded-3xl">
                        <div className="">
                            <Title addClass="text-[25px] text-center font-bold my-2">Product Details</Title>
                            <CouponCode product={product} />
                            <div
                                className="card-text max-h-[400px] overflow-auto scroll-bar"
                                dangerouslySetInnerHTML={{ __html: product?.description.replaceAll("\n", "<br />") }}
                            />
                        </div>
                        <div className="card-footer !gap-4 !text-black !mt-auto">
                            <span className="p-2 mb-2 bg-blue-300">Brand: {product?.brand}</span>
                            <div className="card-footer__item !text-base ">
                                <p>Category: {product?.category?.name}</p>
                                <p>Tags: {product?.tags?.map((item) => item.name)?.join(",")}</p>
                            </div>
                            <div className="card-footer__item !text-base">
                                <ProductLike product={product} />
                                <p>Posted: {dayjs(product?.createdAt).fromNow()}</p>
                            </div>
                            <div className="card-footer__item !text-base">
                                <ProductRating product={product} />
                            </div>
                            <div className="card-footer__item w-full mx-auto">
                                <AddToCart product={product} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid justify-center my-4">
                    <Title addClass="text-[25px] text-center font-bold my-2">Related Products</Title>
                </div>

                <div className="grid gap-4 justify-center my-5">
                    <UserReviews reviews={product?.ratings} />
                </div>
            </div>
        </div>
    );
}
