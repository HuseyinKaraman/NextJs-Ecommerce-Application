"use client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

const ProductCard = ({ product, handleClick, role="user" }) => {
    return (
        <div
            className={`relative mb-5 hover:opacity-90 hover:bg-primary mx-auto border-2 border-slate-300 p-4 rounded-3xl 
            max-w-[480px] md:max-w-[450px] ${role === "admin" && "cursor-pointer"}`}
            onClick={role === "admin" ? () => handleClick(product) : null}
        >
            <div className="max-h-[300px] overflow-hidden">
                <Image
                    src={product?.images[0]?.secure_url || "/images/default.webp"}
                    alt={product?.title}
                    width={300}
                    height={300}
                    className="!object-cover h-[200px] w-[500px] md:h-[250px] lg:h-[300px] rounded-3xl mx-auto"
                />
            </div>
            <div className="card-body">
                <div className="card-title my-2">
                    <Link href={`/product/${product?.slug}`} className="text-xl font-semibold text-blue-600 cursor-pointer">
                        ${product?.price.toFixed(2)} {product?.title.substring(0, 50)}...
                    </Link>
                </div>

                <div
                    className="card-text"
                    dangerouslySetInnerHTML={{
                        __html:
                            product?.description?.length > 160
                                ? product.description.substring(0, 160) + "..."
                                : product.description,
                    }}
                />
            </div>
            <div className="card-footer">
                <div className="card-footer__item">
                    <p>Category: {product?.category?.name}</p>
                    <p>Tags: {product?.tags?.map((item) => item.name)?.join(",")}</p>
                </div>
                <div className="card-footer__item">
                    <p>💓Likes</p>
                    <p>Posted: {dayjs(product?.createdAt).fromNow()}</p>
                </div>
                <div className="card-footer__item">
                    <p>⭐Stars</p>
                    <p>Brand: {product?.brand}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
