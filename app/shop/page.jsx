"use client";

import ProductFilter from "@/components/product/ProductFilter";

async function getProducts(searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams.page || 1,
        minPrice: searchParams.minPrice || "",
        maxPrice: searchParams.maxPrice || "",
        ratings: searchParams.ratings || "",
        category: searchParams.category || "",
        tag: searchParams.tag || "",
        brand: searchParams.brand || "",
    }).toString();
    //
}

// eslint-disable-next-line @next/next/no-async-client-component
const Shop = async ({ searchParams }) => {
    // console.log("searchParams in shop page", searchParams);
    const data = await getProducts(searchParams);

    return (
        <div className="p-2">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3 p-2 xl:max-w-[325px] max-h-[90vh] overflow-y-auto scroll-bar">
                    <ProductFilter searchParams={searchParams} />
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-7 lg:col-span-8 xl:col-span-9">Product List</div>
            </div>
        </div>
    );
};

export default Shop;
