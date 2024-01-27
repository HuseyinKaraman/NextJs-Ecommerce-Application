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
            <Image
                src={product?.images[0]?.secure_url || "/images/default.webp"}
                alt={product?.title}
                width={300}
                height={300}
                className="!object-cover h-[200px] w-[500px] md:h-[250px] lg:h-[300px] rounded-3xl mx-auto"
            />
            <div className="my-4">
                <p className="text-xl font-semibold text-center">
                    ${product?.price.toFixed(2)} {product?.title.substring(0, 50)}...
                </p>
            </div>
            <p className="text-md font-semibold p-2">
                {product?.description?.length > 160
                    ? product.description.substring(0, 160) + "..."
                    : product.description}
            </p>
        </div>
    );
};

export default Card;
