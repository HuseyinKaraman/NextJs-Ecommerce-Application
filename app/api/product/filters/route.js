import Product from "@/models/product";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import queryString from "query-string";

export async function GET(req) {
    try {
        await dbConnect();
        const searchParams = queryString.parseUrl(req.url).query;
        const { page, minPrice, maxPrice, ratings, category, tag, brand } = searchParams || {};
        const filter = filterQuery(category, minPrice, maxPrice, tag, brand);

        const pageSize = 6;

        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * pageSize;

        const allProducts = await Product.find(filter)
            .populate({
                path: "category",
                select: "name slug",
            })
            .populate({
                path: "tags",
                select: "name parentCategory slug",
            })
            .sort({ createdAt: -1 });

        // calculate average rating for each product
        const productsWithAverageRating = allProducts.map((product) => {
            return {
                ...product.toObject(),
                averageRating: calculateAverageRating(product.ratings),
            };
        });

        const filteredProducts = productsWithAverageRating.filter((product) => {
            if (!ratings) {
                return true;
            } 
            const targetRatings = Number(ratings);
            const difference =  product.averageRating - targetRatings;
            
            return  difference >= -0.5 && difference <= 0.5;
        });


        const totalFilteredProducts = filteredProducts.length;
        // apply pagination
        const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);



        return NextResponse.json({
            products: paginatedProducts,
            currentPage,
            totalPages: Math.ceil(totalFilteredProducts / pageSize),
        });
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}

function filterQuery(category, minPrice, maxPrice, tag, brand) {
    const localFilter = {};

    if (category) {
        localFilter.category = category;
    }
    if (minPrice && maxPrice) {
        localFilter.price = {
            $gte: minPrice,
            $lte: maxPrice,
        };
    }
    if (tag) {
        localFilter.tags = tag;
    }
    if (brand) {
        localFilter.brand = brand;
    }

    return localFilter;
}

// function to calculate average rating for each product
function calculateAverageRating(ratings) {
    if (ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.reduce((acc, item) => acc + item.rating, 0);

    return totalRating / ratings.length;
}
