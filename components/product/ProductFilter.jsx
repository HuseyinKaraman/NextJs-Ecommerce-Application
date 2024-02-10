"use client";
import { priceRanges } from "@/utils/filterData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Stars from "./Stars";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { useEffect, useState } from "react";
import { useProduct } from "@/context/product";

const activeClass = "bg-blue-500 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]";
// const button = "text-white bg-gray-500";
const button = "bg-white shadow-[1px_1px_1px_1px_rgba(0,0,0,0.35)] text-black";

const ProductFilter = ({ searchParams }) => {
    const pathname = "/shop";
    const { minPrice, maxPrice, ratings, category, tag, brand } = searchParams;
    const { categories, fetchCategoriesPublic } = useCategory();
    const { brands, fetchBrands } = useProduct();
    const { tags, fetchTagsPublic } = useTag();
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [filterTags, setFilterTags] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetchCategoriesPublic();
        fetchTagsPublic();
        fetchBrands();
    }, []);

    useEffect(() => {
        if (category) {
            setFilterTags(tags?.filter((t) => t.parentCategory === category));
        }
    }, [category]);

    const handleRemoveFilter = (filterName) => {
        const updatedSearchParams = { ...searchParams };

        // if filterName is string
        if (typeof filterName === "string") {
            delete updatedSearchParams[filterName];
        } else if (Array.isArray(filterName)) {
            // if filterName is array
            filterName?.forEach((name) => delete updatedSearchParams[name]);
        }

        // reset page to 1 when applying new filtering options
        updatedSearchParams.page = 1;

        const queryString = new URLSearchParams(updatedSearchParams).toString();
        const newUrl = `${pathname}?${queryString}`;
        router.push(newUrl);
    };

    return (
        <div>
            <div className="mb-1 flex justify-between text-xl font-serif p-2">
                <p>Filter Products</p>
                <div className="flex gap-3 items-center">
                    <div className="lg:hidden">
                        {openFilterMenu ? (
                            <span onClick={() => setOpenFilterMenu(false)} className="cursor-pointer">
                                X
                            </span>
                        ) : (
                            <span onClick={() => setOpenFilterMenu(true)} className="cursor-pointer">
                                +
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className={`flex flex-col ${openFilterMenu ? "block" : "hidden lg:block"}`}>
                <Link href={"/shop"} className="inline-block text-red-500 mb-3 font-semibold text-[18px] pl-2">
                    Clear Filters
                </Link>

                <p className="p-1 px-2 text-xl w-full mb-3 bg-sky-300">Price</p>
                <div className="flex flex-wrap mb-4 gap-2 justify-around  relative">
                    {priceRanges.map((range, index) => {
                        const url = {
                            pathname,
                            query: {
                                ...searchParams,
                                minPrice: range?.min,
                                maxPrice: range?.max,
                                page: 1,
                            },
                        };

                        const isActive = String(range?.min) === minPrice && String(range?.max) === maxPrice;

                        return (
                            <div className="relative flex text-center rounded-2xl" key={index}>
                                <Link
                                    // key={index}
                                    href={url}
                                    className={`rounded-2xl font-semibold text-center text-[12px] lg:text-[15px] p-2 hover:opacity-75 cursor-pointer ${
                                        isActive ? activeClass : button
                                    }`}
                                >
                                    {range.label}
                                </Link>
                                {isActive && (
                                    <span
                                        className="relative -top-2 text-sm p-1 cursor-pointer z-20 font-semibold"
                                        onClick={() => handleRemoveFilter(["minPrice", "maxPrice"])}
                                    >
                                        (X)
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <p className="p-1 px-2 text-xl w-full mb-3  bg-sky-300">Rating</p>
                <div className="flex flex-wrap mb-4 gap-2 justify-around  relative">
                    {[5, 4, 3, 2, 1].map((ratingValue) => {
                        const isActive = String(ratings) === String(ratingValue);
                        const url = {
                            pathname,
                            query: {
                                ...searchParams,
                                ratings: ratingValue,
                                page: 1,
                            },
                        };

                        return (
                            <div
                                className="relative flex flex-wrap rounded-2xl justify-center md:justify-start"
                                key={ratingValue}
                            >
                                <Link
                                    // key={index}
                                    href={url}
                                    className={`rounded-2xl font-semibold text-xs lg:text-base p-2 cursor-pointer hover:opacity-75 ${
                                        isActive ? activeClass : "bg-white shadow-[2px_2px_2px_2px_rgba(0,0,0,0.35)]"
                                    }`}
                                >
                                    <Stars rating={ratingValue} />
                                </Link>
                                {isActive && (
                                    <span
                                        className="relative -top-2 text-sm p-1 cursor-pointer z-20 font-semibold"
                                        onClick={() => handleRemoveFilter("ratings")}
                                    >
                                        (X)
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <p className="p-1 px-2 text-xl mb-3 w-full bg-sky-300">Categories</p>
                <div className="flex flex-wrap gap-2 mb-4 filter-scroll scroll-bar">
                    {categories?.length > 0 &&
                        categories?.map((c) => {
                            const isActive = c?._id === category;
                            const url = {
                                pathname,
                                query: {
                                    ...searchParams,
                                    category: c?._id,
                                    page: 1,
                                },
                            };

                            return (
                                <div className="flex w-fit text-center" key={c?._id}>
                                    <Link
                                        // key={index}
                                        href={url}
                                        className={`rounded-2xl p-1 w-full inline-block font-semibold text-xs lg:text-base cursor-pointer hover:opacity-75 ${
                                            isActive ? activeClass : button
                                        }`}
                                    >
                                        {c?.name}
                                    </Link>

                                    <span
                                        className={`${
                                            isActive ? "inline text-sm p-1 cursor-pointer font-semibold" : "hidden"
                                        }`}
                                        onClick={() => handleRemoveFilter("category")}
                                    >
                                        (X)
                                    </span>
                                </div>
                            );
                        })}
                </div>

                {category && filterTags?.length > 0 && (
                    <>
                        <p className="p-1 px-2 text-xl mb-3 w-full bg-sky-300">Tags</p>
                        <div className="flex flex-wrap gap-2 mb-4 justify-around items-start filter-scroll !min-h-[50px] scroll-bar">
                            {filterTags?.map((t) => {
                                const isActive = t?._id === tag;
                                const url = {
                                    pathname,
                                    query: {
                                        ...searchParams,
                                        tag: t?._id,
                                        page: 1,
                                    },
                                };

                                return (
                                    <div className="flex w-fit text-center" key={t?._id}>
                                        <Link
                                            // key={index}
                                            href={url}
                                            className={`rounded-2xl p-1 w-full mr-2 inline-block font-semibold text-xs lg:text-base cursor-pointer hover:opacity-75 ${
                                                isActive ? activeClass : button
                                            }`}
                                        >
                                            {t?.name}
                                        </Link>
                                        {isActive && (
                                            <span
                                                className="relative -top-2 right-3 text-sm p-1 cursor-pointer z-20 font-semibold"
                                                onClick={() => handleRemoveFilter("tag")}
                                            >
                                                (X)
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                <p className="p-1 px-2 text-xl mb-3 w-full bg-sky-300">Brands</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-around filter-scroll !min-h-[50px] scroll-bar">
                    {brands?.length > 0 &&
                        brands?.map((b, index) => {
                            const isActive = b === brand;
                            const url = {
                                pathname,
                                query: {
                                    ...searchParams,
                                    brand: b,
                                    page: 1,
                                },
                            };

                            return (
                                <div className="flex w-fit items-start text-center" key={index}>
                                    <Link
                                        // key={index}
                                        href={url}
                                        className={`rounded-2xl p-1 w-full inline-block font-semibold text-xs lg:text-base cursor-pointer hover:opacity-75 ${
                                            isActive ? activeClass : button
                                        }`}
                                    >
                                        {b}
                                    </Link>

                                    <span
                                        className={`${
                                            isActive ? "inline text-sm p-1 cursor-pointer font-semibold" : "hidden"
                                        }`}
                                        onClick={() => handleRemoveFilter("brand")}
                                    >
                                        (X)
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
