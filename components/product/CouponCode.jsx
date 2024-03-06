"use client";
import { useEffect } from "react";
import { useCart } from "@/context/cart";
import { useSearchParams } from "next/navigation";

const CouponCode = ({ product }) => {
    const { handleCoupon, setCouponCode, percentOff, validCoupon } = useCart();
    const searchParams = useSearchParams();
    const code = searchParams.get("couponCode");

    useEffect(() => {
        if (code) {
            setCouponCode(code);
            handleCoupon(code);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    return (
        <div className="flex justify-between items-center gap-2 w-full px-2 mb-2">
            {validCoupon ? (
                <h4 className="line-through text-red-600 font-semibold text-xl">${product?.price.toFixed(2)}</h4>
            ) : (
                <h4 className="text-xl font-semibold text-red-600">${product?.price.toFixed(2)}</h4>
            )}

            {percentOff ? (
                <h4 className="text-red-600 bg-red-200 text-xl font-semibold p-1">
                    ${((product?.price * (100 - percentOff)) / 100).toFixed(2)} ({percentOff}% OFF)
                </h4>
            ) : ""}
        </div>
    );
};

export default CouponCode;
