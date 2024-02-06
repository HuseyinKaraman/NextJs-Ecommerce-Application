"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useProduct } from "@/context/product";
import { calculateAverageRating } from "@/utils/helpers";
import Stars from "@/components/product/Stars";
import Modal from "@/components/Modal";
import { FaStar } from "react-icons/fa";

const ProductRating = ({ product,leaveRating=true }) => {
    const { currentRating, setCurrentRating, comment, setComment, showRatingModal, setShowRatingModal } = useProduct();
    const [productRatings, setProductRatings] = useState(product?.ratings || []);
    const [averageRating, setAverageRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(null);
    // current User
    const { data: session, status } = useSession();

    const router = useRouter();
    const pathname = usePathname();

    let alreadyRated = productRatings?.find((rate) => rate?.postedBy?._id === session?.user?._id);

    useEffect(() => {
        if (alreadyRated) {
            console.log("alreadyRated", currentRating);
            setCurrentRating(alreadyRated?.rating);
            setComment(alreadyRated?.comment);
        } else {
            console.log(" not alreadyRated", currentRating);
            setCurrentRating(0);
            setComment("");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alreadyRated]);

    useEffect(() => {
        if (productRatings) {
            const average = calculateAverageRating(productRatings);
            setAverageRating(average);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.ratings]);


    const submitRating = async () => {
        if (status !== "authenticated") {
            toast.error("You must be logged in to leave a rating", {
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
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/product/rating`, {
                productId: product._id,
                rating: currentRating,
                comment,
            });

            if (res.status !== 200) {
                throw new Error("Failed to rate");
            }

            setProductRatings(res?.data?.ratings);
            alreadyRated = res?.data?.ratings?.find((rate) => rate?.postedBy?._id === session?.user?._id);
            setShowRatingModal(false);
            toast.success("Thank you for leaving a rating", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            router.refresh();
        } catch (error) {
            toast.error("Failed to rate", {
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
            <div className="flex gap-2">
                <Stars rating={averageRating} />
                {productRatings?.length > 0 && <p className="font-medium">{averageRating} ({productRatings?.length})</p>}
            </div>

            {leaveRating && <p className="!align-middle text-sm font-medium cursor-pointer" onClick={() => setShowRatingModal(true)}>
                {alreadyRated ? "Edit rating" : "Leave a rating"}
            </p>}

            {showRatingModal && (
                <Modal>
                    <div className="flex flex-col p-2 w-[22rem] md:p-5 gap-3 mx-auto border border-gray-300 rounded shadow bg-white">
                        <h3 className="text-lg font-medium">Rate this product</h3>
                        <div className="">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;

                                return (
                                    <span
                                        key={ratingValue}
                                        className={ratingValue <= currentRating ? "star-active" : "text-gray-400"}
                                        onClick={() => setCurrentRating(ratingValue)}
                                    >
                                        <FaStar
                                            className={`inline-block 
                                                    ${
                                                        hoverRating >= ratingValue
                                                            ? "star-active"
                                                            : hoverRating && "text-gray-500"
                                                    }
                                                `}
                                            onMouseEnter={() => setHoverRating(ratingValue)}
                                            onMouseLeave={() => setHoverRating(null)}
                                        />
                                    </span>
                                );
                            })}
                        </div>
                        <textarea
                            value={comment}
                            placeholder="Write a comment"
                            rows={4}
                            cols={50}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border border-gray-300 p-2"
                        />
                        <button onClick={submitRating} className="btn-primary ml-auto">
                            Submit
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ProductRating;
