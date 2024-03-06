"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import OrderSummary from "@/components/cart/OrderSummary";
import Title from "@/components/ui/Title";
import { useCart } from "@/context/cart";

const ContactDetail = ({ onNextStep, onPrevStep }) => {
    const { data: session, status, update } = useSession();
    const { couponCode, setCouponCode, handleCoupon,validCoupon } = useCart();

    if (status !== "authenticated") {
        return (
            <div className="grid grid-cols-12">
                <div className="grid grid-cols-12 col-start-3 col-span-8 justify-center gap-2 mt-20">
                    <button className="btn-danger-outline col-span-6" onClick={onPrevStep}>
                        PREVIOUS
                    </button>
                    <Link
                        href={`/login?callbackUrl=${window.location.pathname}`}
                        className="btn !rounded-md !bg-blue-400 col-span-6 text-center p-2"
                    >
                        LOGIN TO CONTINUE
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-5 mt-5 px-2 lg:px-0">
            <div className="col-span-12 lg:col-span-8 px-2">
                <Title addClass={"text-[22px] bg-blue-200 mb-4 p-2 text-white"}>Contact Details</Title>
                <input type="text" value={session?.user?.name} disabled className="mb-2 w-full p-2 bg-gray-200" />
                <input type="email" value={session?.user?.email} disabled className="mb-2 w-full p-2 bg-gray-200" />
                <div className="">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="mb-2 w-full p-2 bg-gray-200"
                    />
                    <button onClick={()=>handleCoupon(couponCode)} className="btn !bg-green-600 !rounded-none disabled:opacity-40" disabled={!couponCode.trim()}>APPLY COUPON</button> 
                    {validCoupon && <p className="text-xs text-danger">Coupon Applied On Payment Process</p>}
                </div>
                <div className="grid grid-cols-12 gap-3 my-4">
                    <button className="btn-danger-outline col-span-6" onClick={onPrevStep}>
                        PREVIOUS
                    </button>
                    <button className="btn !rounded-md !bg-blue-400 col-span-6" onClick={onNextStep}>
                        CONTINUE
                    </button>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
                <OrderSummary />
            </div>
        </div>
    );
};

export default ContactDetail;
