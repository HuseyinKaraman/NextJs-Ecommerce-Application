"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [updatingProduct, setUpdatingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);

    const router = useRouter();

    const uploadImages = (e) => {
        console.log(e.target.files);
    };

    const deleteImage = (public_id) => {
        //
    };

    const createProduct = async () => {
        try {
            const res = await axios.post(`${process.env.API}/admin/product`, {
                ...product,
            });
            if (res.status === 201) {
                toast.success(`Product ${res.data?.title} created`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                router.push("/dashboard/admin/products");
            }
        } catch (error) {
            const message = error?.response?.data?.error ? error.response.data.error : "Something went wrong";
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const fetchProducts = async (page = 1) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product?page=${page}`);
            if (res.status === 200) {
                setProducts(res?.data?.products);
                setCurrentPage(res?.data?.currentPage);
                setTotalPages(res?.data?.totalPages);
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const deleteProduct = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/${updatingProduct?._id}`);
            if (res.status === 200) {
                toast.success(`Product ${res.data?.title} deleted`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                router.back();
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const updateProduct = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/product/${updatingProduct?._id}`, {
                ...updatingProduct,
            });
            if (res.status === 200) {
                toast.success(`Product ${res.data?.title} updated`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                router.back();
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <ProductContext.Provider
            value={{
                product,
                setProduct,
                products,
                setProducts,
                updatingProduct,
                setUpdatingProduct,
                currentPage,
                setCurrentPage,
                totalPages,
                setTotalPages,
                uploading,
                setUploading,
                uploadImages,
                deleteImage,
                createProduct,
                fetchProducts,
                deleteProduct,
                updateProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);
