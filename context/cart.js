"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // load cart ıtems from local storage
    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // save cart items to local storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // add product to cart
    const addToCart = (product, quantity) => {
        const existingProduct = cartItems.find((item) => item._id === product._id);
       
        if (existingProduct) {
            const updatedCartItems = cartItems.map((item) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
    };

    // remove product from cart
    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== productId);
        setCartItems(updatedCartItems);
        // update local storage
        if (typeof window !== "undefined") {
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
    };

    // update quantity
    const updateQuantity = (product, quantity) => {
        const updatedItems = cartItems.map((item) => item._id === product._id ? { ...item, quantity } : item);
        setCartItems(updatedItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    };

    // clear cart
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
