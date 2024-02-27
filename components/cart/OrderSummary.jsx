"use client";
import { useCart } from "@/context/cart";
import Image from "next/image";

const OrderSummary = () => {
    const { cartItems } = useCart();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item?.price * item?.quantity, 0);
    };

    const totalItems = cartItems.reduce((total, item) => total + item?.quantity, 0);

    const itemOrItems = totalItems === 1 ? "item" : "items";

    return (
        <>
            <p className={"text-[22px] bg-blue-200 mb-4 p-2 text-white"}>Order Summary</p>
            <div className="flex justify-between w-full shadow-md rounded-md">
                <div className="flex flex-col gap-8 px-1">
                    {cartItems?.map((item, index) => (
                        <div className="grid grid-cols-12 gap-5" key={item._id}>
                            <div className="col-span-3">
                                <div className="h-[66px] overflow-hidden">
                                    <Image
                                        src={item?.images[0].secure_url || "/images/default.webp"}
                                        alt={item?.title}
                                        width={500}
                                        height={300}
                                        className="!object-cover h-full w-full"
                                    />
                                </div>
                            </div>
                            <div className="col-span-7">
                                <p className="text-[12px] xl:text-[16px]">{item?.title}</p>
                            </div>
                            <div className="col-span-2">
                                <strong className="text-[12px] lg:text-[16px]">${item?.price.toFixed(2)}</strong>
                                <p className="text-[12px] lg:text-[16px] mt-1">Qty: {item?.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-8 px-1 mt-4 w-full justify-between font-semibold">
                <p className="text-xl">
                    Total {totalItems} {itemOrItems}:
                </p>
                <p className="text-xl">${calculateTotalPrice().toFixed(2)}</p>
            </div>
        </>
    );
};

export default OrderSummary;
