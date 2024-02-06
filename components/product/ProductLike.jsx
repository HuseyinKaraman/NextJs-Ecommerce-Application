"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import PopConfirm from "../PopConfirm";

const ProductLike = ({ product }) => {
    const { data: session,status } = useSession();
    const [likes, setLikes] = useState(product?.likes);
    const [confirm, setConfirm] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const isLiked = likes?.includes(session?.user?._id);

    const handleLike = async () => {
        if (status !== "authenticated") {
            toast.error("Please login to like", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            router.push(`/login?callbackUrl=${pathname}`);
            return;
        }

        try {
            if (isLiked) {
                setConfirm(true); // Set the confirm state to true to show the PopConfirm for unlike
            } else {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/product/like`, {
                    productId: product._id,
                });

                if (res.status === 200) {
                    setLikes(res.data.likes);
                    toast.success("Product liked", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    router.refresh();
                }
            }
        } catch (error) {
            toast.error("Failed to like", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const handleUnlike = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/product/unlike`, {
                productId: product._id,
            });

            if (res.status === 200) {
                setLikes(res.data.likes);
                toast.success("Product unliked", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error("Failed to unlike", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <>
            {!likes?.length ? (
                <span onClick={handleLike} className="cursor-pointer hover:text-secondray">
                    <i className="fa-regular fa-heart"></i> Be the first to like this product
                </span>
            ) : (
                <span onClick={handleLike} className="cursor-pointer hover:text-secondray">
                    <i className="fa-solid fa-heart !text-red-600"></i> {likes.length} people liked
                </span>
            )}
            {confirm && (
                <PopConfirm
                    message="Are you sure you want to unlike this product?"
                    sendRequest={handleUnlike}
                    setConfirm={setConfirm}
                    addClass={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
                />
            )}
        </>
    );
};

export default ProductLike;
