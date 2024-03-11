"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart";

const UserStripeSuccess = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center items-center mt-10 gap-4">
                <p className="text-2xl font-serif px-2 md:px-0">
                    Thank you for your purchase. You can now check your order status in the dashboard.
                </p>
                <hr className="w-10/12" />
                <Link href="/dashboard/user/orders" className="btn-primary-2 !rounded-none text-xl">
                    View Order Status
                </Link>
            </div>
        </div>
    );
};

export default UserStripeSuccess;
