"use client";
import { useState } from "react";
import OrderSummary from "@/components/cart/OrderSummary";
import { toast } from "react-toastify";
import { useCart } from "@/context/cart";
import axios from "axios";

const Payment = ({ onPrevStep }) => {
    const { cartItems } = useCart();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const cartData = cartItems.map((item) => ({
                _id: item._id,
                quantity: item.quantity,
            }));

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/stripe/session`, {
                cartItems: cartData,
            });

            if (response.status === 200) {
                window.location.href = response.data;
            } else {
                toast.error("Something went wrong. Please try again");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again");
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-2 px-2 md:px-0 mt-5">
            <div className="col-span-12 md:col-span-7 grid grid-cols-12 gap-1 h-fit">
                <div className="col-span-12">
                    <p className={"text-[22px] bg-blue-200 mb-4 p-2 text-white"}>Payment Method</p>
                    <h2 className="text-3xl text-center my-2">🔒 💳</h2>
                    <p>Flat rate $5 shipping fee will apply for all Turkiye wide! </p>
                    <p className="text-gray-100 p-5 bg-gray-500 mt-2">
                        Clicking &#39;Place Order&#39; will securely redirect you to our trusted payment partner, Stripe
                        to complete the order.
                    </p>
                </div>

                <div className="col-span-12 grid grid-cols-12 gap-3 my-2 items-start">
                    <button className="btn-danger-outline col-span-6" onClick={onPrevStep}>
                        PREVIOUS
                    </button>
                    <button className="btn-success col-span-6" onClick={handleClick} disabled={loading}>
                        {loading ? "Processing.." : "PLACE ORDER"}
                    </button>
                </div>
            </div>
            <div className="col-span-12 md:col-span-5">
                <OrderSummary />
            </div>
        </div>
    );
};

export default Payment;
