"use client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Card = ({ product, handleClick }) => {

    return (
        <div
            className="relative cursor-pointer mb-5 hover:opacity-90 hover:bg-primary mx-auto border-2 border-slate-300 p-4 rounded-3xl"
            onClick={() => handleClick(product)}
        >
            <div className="max-h-[300px] overflow-hidden">
                <Image
                    src={product?.images[0]?.secure_url || "/images/default.webp"}
                    alt={product?.title}
                    width={300}
                    height={300}
                    className="!object-contain h-[200px] w-[500px] md:h-[250px] lg:h-[300px] rounded-3xl mx-auto"
                />
            </div>
            <div className="card-body">
                <div className="card-title my-2">
                    <p className="text-xl font-semibold text-center">
                        ${product?.price.toFixed(2)} {product?.title.substring(0, 50)}...
                    </p>
                </div>

                <div className="card-text">
                    <p>
                        {product?.description?.length > 160
                            ? product.description.substring(0, 160) + "..."
                            : product.description}
                    </p>
                </div>
            </div>
            <div className="card-footer">
                <div className="p-2 flex justify-between border-t-2 border-slate-300">
                    <small>Category: {product?.category?.name}</small>
                    <small>Tags: {product?.tags?.map((item) => item.name)?.join(",")}</small>
                </div>
                <div className="p-2 flex justify-between border-t-2 border-slate-300">
                    <small>💓Likes</small>
                    <small>Posted: {dayjs(product?.createdAt).fromNow()}</small>
                </div>
                <div className="p-2 flex justify-between border-t-2 border-slate-300">
                    <small>Brand: {product?.brand}</small>
                    <small>⭐Stars</small>
                </div>
            </div>
        </div>
    );
};

export default Card;
