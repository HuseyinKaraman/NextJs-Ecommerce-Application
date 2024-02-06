"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [updatingProduct, setUpdatingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //
    const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
    const [currentImagePreviewUrl, setCurrentImagePreviewUrl] = useState("");
    // rating system
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const [comment, setComment] = useState("");

    const router = useRouter();

    // modal for image preview and ratings
    const openImagePreviewModal = (url) => {
        setCurrentImagePreviewUrl(url);
        setShowImagePreviewModal(true);
    };

    const closeModal = () => {
        setShowImagePreviewModal(false);
        setCurrentImagePreviewUrl("");
        setShowRatingModal(false);
    };

    const uploadImages = (e) => {
        const files = e.target.files;

        let allUploadedFiles = updateProduct ? updatingProduct?.images || [] : product ? product?.images || [] : [];

        if (files) {
            // check if total images exceed 4
            const totalImages = allUploadedFiles?.length + files?.length;

            if (totalImages > 4) {
                toast.error("You can upload maximum 4 images", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return;
            }

            setUploading(true);
            const uploadPromises = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const extension = file.name.split(".")[1];

                // resize image
                const promise = new Promise((resolve, reject) => {
                    Resizer.imageFileResizer(
                        file,
                        1280,
                        720,
                        extension,
                        100,
                        0,
                        (uri) => {
                            axios
                                .post(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload/image`, {
                                    image: uri,
                                })
                                .then((res) => {
                                    allUploadedFiles.unshift(res?.data);
                                    resolve();
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        },
                        "base64"
                    );
                });

                uploadPromises.push(promise);
            }

            Promise.all(uploadPromises)
                .then(() => {
                    toast.success("Images uploaded successfully", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, images: allUploadedFiles })
                        : setProduct({ ...product, images: allUploadedFiles });
                    setUploading(false);
                })
                .catch((err) => {
                    toast.error("Something went wrong", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    setUploading(false);
                });
        }
    };

    const deleteImage = (public_id) => {
        setUploading(true);
        axios
            .put(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload/image`, {
                public_id,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Image deleted successfully", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    const filteredImages = updatingProduct
                        ? updatingProduct?.images?.filter((image) => image.public_id !== public_id)
                        : product?.images?.filter((image) => image.public_id !== public_id);

                    updatingProduct
                        ? setUpdatingProduct({ ...updatingProduct, images: filteredImages })
                        : setProduct({ ...product, images: filteredImages });
                }
            })
            .catch((err) => {
                console.log("image delete err: ", err);
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            })
            .finally(() => setUploading(false));
    };

    const createProduct = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/product`, {
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
                setIsLoading(false);
                setProduct(null);
                router.push("/dashboard/admin/product");
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
            setIsLoading(false);
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
        setIsLoading(true);
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
                setIsLoading(false);
                // router.back();
                window.location.href = "/dashboard/admin/product";
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setIsLoading(false);
        }
    };
    const updateProduct = async () => {
        setIsLoading(true);
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
                setIsLoading(false);
                // router.back();
                window.location.href = "/dashboard/admin/product";
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setIsLoading(false);
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
                isLoading,
                setIsLoading,
                uploadImages,
                deleteImage,
                createProduct,
                fetchProducts,
                deleteProduct,
                updateProduct,
                showImagePreviewModal,
                setShowImagePreviewModal,
                closeModal,
                openImagePreviewModal,
                currentImagePreviewUrl,
                setCurrentImagePreviewUrl,
                showRatingModal,
                setShowRatingModal,
                currentRating,
                setCurrentRating,
                comment,
                setComment,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);
