"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    useEffect(() => {
        fetchOrders(page);
    }, [page]);

    const fetchOrders = async (page) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?page=${page}`);

            if (res.status !== 200) {
                throw new Error("Failed to fetch orders");
            }

            setOrders([...res?.data?.orders]);
            setCurrentPage(res?.data?.currentPage);
            setTotalPages(res?.data?.totalPages);
            setLoading(false);
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
            });
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus, orderId) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}`, {
                delivery_status: newStatus,
            });

            if (res.status !== 200) {
                throw new Error("Failed to update order status.Please try again later.");
            } else {
                setOrders((prevOrders) =>
                    prevOrders.map((o) => (o._id === orderId ? { ...o, delivery_status: newStatus } : o))
                );
                toast.success("Order status updated", { position: "top-right" });
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
                                        <div key={index} className="flex flex-col p-3 mb-4 gap-2 bg-gray-200">
                                            <div className="block p-2 ">
                                                <span className="font-bold inline-block text-left w-[150px] md:w-[250px] lg:w-[400px]">
                                                    Customer Name:
                                                </span>
                                                <span className="">{order?.userId?.name}</span>
                                            </div>
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
                                                    <select
                                                        className="w-full border rounded-md p-1 bg-white"
                                                        defaultValue={order?.delivery_status}
                                                        onChange={(e) => handleStatusChange(e.target.value, order._id)}
                                                        disabled={order?.refunded}
                                                    >
                                                        <option value="Not Processed">Not Processed</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Dispatched">Dispatched</option>
                                                        <option value="Delivered">Delivered</option>
                                                        {order?.refunded && <option value="Cancelled">Cancelled</option>}
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Pagination totalPages={totalPages} currentPage={currentPage} />
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

export default AdminOrders;
