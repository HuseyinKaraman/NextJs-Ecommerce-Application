"use client";
import { useProduct } from "@/context/product";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "../Modal";

const ProductImage = ({ product }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const {
        showImagePreviewModal,
        currentImagePreviewUrl,
        setCurrentImagePreviewUrl,
        closeModal,
        openImagePreviewModal,
    } = useProduct();

    const handleClick = (index) => {
        if (index < 0) {
            index = product?.images?.length - 1;
        } else if (index >= product?.images?.length) {
            index = 0;
        }
        setImageIndex(index);
        setCurrentImagePreviewUrl(product?.images[index].secure_url);
    };

    const showImage = (img, option) => {
        return (
            <Image
                src={img}
                alt={product?.title}
                width={option ? 500 : 300}
                height={option ? 500 : 300}
                className={
                    option
                        ? "!object-contain w-[500px] md:h-fit md:w-fit mx-auto rounded-[5%]"
                        : "!object-contain w-[300px] md:h-fit md:w-fit shadow-3xl border-4 rounded-3xl mx-auto cursor-pointer"
                }
                onClick={() => openImagePreviewModal(img)}
            />
        );
    };

    return (
        <div className="overflow-hidden relative lg:h-[720px]">
            {product?.images.length > 0 ? showImage(product?.images[imageIndex].secure_url) : showImage("/images/default.webp")}

            {showImagePreviewModal && <Modal closeModal={closeModal}>{showImage(currentImagePreviewUrl, true)}</Modal>}

            {product?.images?.length > 1 && (
                <div
                    className={`${
                        showImagePreviewModal
                            ? "fixed flex justify-center items-center gap-2 bottom-[23.5%] left-1/2 -translate-x-1/2 md:bottom-40 !z-50"
                            : "flex justify-center items-center gap-2 mt-2 w-full md:w-fit mx-auto"
                    } `}
                >
                    {Array.from({ length: product?.images?.length }, (_, index) => (
                        <div
                            key={index}
                            className={`w-5 h-5 mb-2 px-5 bg-secondray rounded-md flex justify-center items-center cursor-pointer ${
                                imageIndex === index && "!bg-primary"
                            }
                                `}
                            onClick={() => handleClick(index)}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImage;
