"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/orders`);

            if (res.status !== 200) {
                throw new Error("Failed to fetch orders");
            }

            setOrders([...res?.data]);
            setLoading(false);
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
            });
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/refund?orderId=${orderId}`);

            if (res.status !== 200) {
                throw new Error("Somespaning went wrong.Please try again later");
            } else {
                toast.success("Order cancelled", { position: "top-right" });
                fetchOrders();
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
            });
        }
    };

    return (
        <div className="container mx-auto mb-5">
            {!loading ? (
                <>
                    <div className="mt-5 p-1">
                        {orders.length > 0 ? (
                            <>
                                <h4 className="text-3xl font-serif mb-5 text-center">Your Orders</h4>
                                <div className="w-full md:w-9/12 mx-auto">
                                    {orders?.map((order, index) => (
                                        <div key={index} className="flex flex-col bg-gray-200 p-3 mb-4 gap-2">
                                            <div className="block p-2 bg-gray-300">
                                                <span className="font-bold inline-block text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Charge ID:
                                                </span>
                                                <span className="">{order?.chargeId}</span>
                                            </div>
                                            <div className="block p-2">
                                                <span className="font-bold inline-block text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Created:
                                                </span>{" "}
                                                <span>{new Date(order?.createdAt).toLocaleString()}</span>
                                            </div>
                                            <div className="block p-2 bg-gray-300">
                                                <span className="font-bold inline-block text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Payment Intent:
                                                </span>
                                                <span>{order?.payment_intent}</span>
                                            </div>
                                            <div className="block p-2">
                                                <span className="font-bold inline-block text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Receipt:
                                                </span>
                                                <span>
                                                    <Link
                                                        href={order?.receipt_url}
                                                        target="_blank"
                                                        className="text-blue-400 font-serif font-bold"
                                                    >
                                                        View Receipt
                                                    </Link>
                                                </span>
                                            </div>
                                            <div className="block p-2 bg-gray-300">
                                                <span className="inline-block font-bold text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Refunded:
                                                </span>
                                                <span>{order?.refunded ? "Yes" : "No"}</span>
                                            </div>
                                            <div className="block p-2">
                                                <span className="inline-block font-bold text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Status:
                                                </span>
                                                <span>{order?.status}</span>
                                            </div>
                                            <div className="block p-2 bg-gray-300">
                                                <span className="inline-block font-bold text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Total Charged:
                                                </span>
                                                <span>
                                                    {(order?.amount_captured / 100)?.toFixed(2)} {order?.currency}
                                                </span>
                                            </div>
                                            {/* Product Info*/}
                                            <div className="p-2 flex">
                                                <span className="inline-block font-bold text-left w-[26%] md:w-[46%] lg:w-[40%] xl:w-[36%]">
                                                    Orders Products:
                                                </span>
                                                <span className="inline-block w-[74%] md:w-[54%] lg:w-[60%] xl:w-[64%]">
                                                    {order?.cartItems?.map((product) => (
                                                        <span
                                                            className="cursor-pointer inline-block text-blue-400 font-serif font-bold mb-1"
                                                            key={product._id}
                                                            onClick={() => router.push(`/product/${product?.slug}`)}
                                                        >
                                                            {product?.quantity}x{" "}
                                                            {product?.title.length > 40
                                                                ? product?.title.slice(0, 40) + ".."
                                                                : product?.title}{" "}
                                                            <span className="pl-2">
                                                                ${product?.price?.toFixed(2)} {order?.currency}
                                                            </span>
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                            <div className="block bg-gray-300 p-2">
                                                <span className="inline-block font-bold text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Delivery Address:
                                                </span>
                                                <span>
                                                    {order?.shipping?.address?.line1}
                                                    {order?.shipping?.address?.line2 &&
                                                        `${order?.shipping?.address?.line2},`}{" "}
                                                    {order?.shipping?.address?.city}/{order?.shipping?.address?.state}
                                                </span>
                                            </div>
                                            <div className="flex p-2">
                                                <span className="inline-block font-bold text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Delivery Status:
                                                </span>
                                                <span className="flex flex-col w-1/2">
                                                    <p className="inline-block">{order?.delivery_status}</p>
                                                    {order?.delivery_status === "Not Processed" && !order.refunded && (
                                                        <p
                                                            className="text-danger cursor-pointer font-semibold"
                                                            onClick={() => handleCancelOrder(order?._id)}
                                                        >
                                                            Cancel the order
                                                        </p>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="flex justify-center items-center h-[50vh] text-xl">No Orders</p>
                        )}
                    </div>
                </>
            ) : (
                <p className="flex justify-center items-center h-[50vh] text-xl">LOADING...</p>
            )}
        </div>
    );
};

export default Orders;
