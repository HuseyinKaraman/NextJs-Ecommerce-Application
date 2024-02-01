"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductImage = ({ product }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [image, setImage] = useState(product?.images?.[imageIndex]);
    const [modal, setModal] = useState(false);

    const handleClick = (index) => {
        if (index < 0) {
            index = product?.images?.length - 1;
        } else if (index >= product?.images?.length) {
            index = 0;
        }
        setImageIndex(index);
        setImage(product?.images?.[index]);
    };

    const showImage = (img) => {
        return (
            <>
                <Image
                    src={img}
                    alt={product?.title}
                    width={300}
                    height={300}
                    className="!object-cover w-[300px] md:h-fit md:w-fit shadow-3xl border-4 rounded-3xl mx-auto cursor-pointer"
                    onClick={() => setModal(true)}
                />
                {product?.images?.length > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-2 w-full md:w-fit mx-auto">
                        {Array.from({ length: product?.images?.length }, (_, index) => (
                            <div
                                key={index}
                                className={`w-4 h-4 mb-2 bg-black/30 rounded-full flex justify-center items-center cursor-pointer ${
                                    imageIndex === index && "bg-primary"
                                }
                            `}
                                onClick={() => handleClick(index)}
                            >
                                <p className="text-xl p-2 text-white">{""}</p>
                            </div>
                        ))}
                    </div>
                )}
            </>
        );
    };

    const handleModal = (img) => {
        return (
                <div className="fixed inset-0 bg-black/50 z-30 p-10 md:p-4 cursor-pointer">
                    <div className="w-full h-full flex justify-center items-center" onClick={() => setModal(false)}>
                        <Image
                            src={img}
                            alt={product?.title}
                            width={500}
                            height={500}
                            className="!object-cover w-[500px] md:h-fit md:w-fit shadow-3xl border-4 rounded-3xl mx-auto"
                        />
                    </div>
                    {product?.images?.length > 1 && (
                        <div className="absolute flex justify-center items-center gap-2 bottom-1/3 left-1/2 md:bottom-40 -translate-x-1/2 z-10">
                            {Array.from({ length: product?.images?.length }, (_, index) => (
                                <div
                                    key={index}
                                    className={`w-5 h-5 mb-2 px-5 bg-secondray rounded-md flex justify-center items-center cursor-pointer ${
                                        imageIndex === index && "!bg-primary"
                                    }
                                `}
                                    onClick={() => handleClick(index)}></div>
                            ))}
                        </div>
                    )}
                </div>
        );
    };

    return (
        <div className="overflow-hidden relative lg:h-[720px]">
            {product?.images.length > 0 ? showImage(image?.secure_url) : showImage("/images/default.webp")}

            {modal && handleModal(image?.secure_url)}
        </div>
    );
};

export default ProductImage;