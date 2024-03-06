"use client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import ProductRating from "./ProductRating";
import ProductLike from "./ProductLike";
import AddToCart from "./AddToCart";

dayjs.extend(relativeTime);

const ProductCard = ({ product, handleClick, role = "user" }) => {
    return (
        <div
            className={`relative mb-5 mx-auto border-2 border-slate-300 p-4 
            max-w-[480px] md:max-w-[450px] ${role === "admin" && "cursor-pointer"} transition-all`}
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
                    <Link
                        href={`/product/${product?.slug}`}
                        className="text-xl text-blue-600 cursor-pointer hover:underline"
                    >
                        <strong>
                            ${product?.price.toFixed(2)}{" "}
                            {product?.previousPrice > product?.price && (
                                    <span className="text-danger line-through decoration-2">
                                        (${product?.previousPrice.toFixed(2)})
                                    </span>
                            )}
                        </strong>{" "}
                        {product?.title.substring(0, 50)}...
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
                    <ProductLike product={product} />
                    <p>Posted: {dayjs(product?.createdAt).fromNow()}</p>
                </div>
                <div className="card-footer__item border-b-2 mb-2">
                    <p>Brand: {product?.brand}</p>
                    <ProductRating product={product} leaveRating={false} />
                </div>
            </div>

            <AddToCart product={product} />
        </div>
    );
};

export default ProductCard;
