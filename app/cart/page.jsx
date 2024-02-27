"use client";
import ContactDetail from "@/components/cart/ContactDetail";
import Payment from "@/components/cart/Payment";
import ReviewCart from "@/components/cart/ReviewCart";
import Title from "@/components/ui/Title";
import { useCart } from "@/context/cart";
import Link from "next/link";
import { useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";

const Cart = () => {
    const { cartItems } = useCart();
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const tickIcon = (stepNumber) => {
        return step === stepNumber ? (
            <GoCheckCircleFill className="inline-block text-red-500 text-2xl align-middle mb-1" />
        ) : step > stepNumber ? (
            <GoCheckCircleFill className="inline-block text-green-500 text-2xl align-middle mb-1" />
        ) : null;
    };

    if (!cartItems?.length) {
        return (
            <div className="w-1/2 mx-auto flex-col h-[90vh] gap-2 flex justify-center items-center">
                <Title addClass="text-[40px] text-gray-400  text-center my-2">Your cart is empty!</Title>
                <Link href={"/shop"} className="btn !bg-blue-400 !rounded-lg text-white text-xl">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center gap-7 md:gap-32 my-4">
                <Title addClass={"text-[20px] md:text-[25px] lg:text-[28px] font-sans mb-4"}>{tickIcon(1)} Review Cart</Title>
                <Title addClass={"text-[20px] md:text-[25px] lg:text-[28px] font-sans mb-4"}>{tickIcon(2)} Contact Details</Title>
                <Title addClass={"text-[20px] md:text-[25px] lg:text-[28px] font-sans mb-4"}>{tickIcon(3)} Payment</Title>
            </div>
            {step === 1 && <ReviewCart onNextStep={handleNextStep} />}
            {step === 2 && <ContactDetail onPrevStep={handlePrevStep} onNextStep={handleNextStep} />}
            {step === 3 && <Payment onPrevStep={handlePrevStep} />}
        </div>
    );
};

export default Cart;
