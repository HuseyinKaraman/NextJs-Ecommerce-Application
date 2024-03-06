"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart";
import Link from "next/link";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const AddToCart = ({ product, reviewAndCheckout=true }) => {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    // find the product in the cart if it exists
    const existingProduct = cartItems?.find((item) => item?._id === product?._id);
    const initialQuantity = existingProduct ? existingProduct?.quantity : 1;

    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(existingProduct ? existingProduct?.quantity : 1);
    }, [existingProduct]);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(product, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(product, newQuantity);
        } else {
            removeFromCart(product?._id);
            setQuantity(1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="flex w-full">
            {cartItems?.some((item) => item?._id === product?._id) ? (
                <>
                    <div className="flex justify-between gap-4 mx-auto items-center w-full">
                        <button className="border-2 border-black w-12 h-8" onClick={handleDecrement}>
                            -
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-36 md:w-2/3 font-semibold text-xl text-center border-b-2 pb-2 border-gray-500"
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                            min="1"
                        />

                        <button className="border-2 border-black w-12 h-8" onClick={handleIncrement}>
                            +
                        </button>
                    </div>
                    {cartItems?.length > 0 && reviewAndCheckout && (
                        <Link href="/cart" className="fixed z-30 right-5 bottom-5 bg-rose-600 pt-2 text-white h-10 p-2 text-center rounded-lg" onClick={handleAddToCart}>
                            <MdOutlineShoppingCartCheckout className="inline-block text-2xl align-middle"/>
                        </Link>
                    )}
                </>
            ) : (
                <button className="bg-red-600 text-white h-10 text-center rounded-lg !w-full" onClick={handleAddToCart}>
                    Add to cart
                </button>
            )}
        </div>
    );
};

export default AddToCart;
