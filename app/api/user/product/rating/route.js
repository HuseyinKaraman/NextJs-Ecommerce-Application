import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/product";
// import Order from "@/models/order";
import { currentUser } from "@/utils/currentUser";

export async function POST(request) {
    await dbConnect();
    const { productId, rating, comment } = await request.json();
    const user = await currentUser();

    try {
        const product = await Product.findById(productId);
        // check if user already rated
        const existingRating = product.ratings.find((r) => r.postedBy.toString() === user._id.toString());

        // TODO: check if user has purchased the product

        if (existingRating) {
            // update existing rating
            existingRating.rating = rating;
            existingRating.comment = comment;
            await product.save();

            return NextResponse.json(product);
        }

        // if user has not rated yet add new rating
        product.ratings.push({ rating, comment, postedBy: user._id }); 
        const updated = await product.save();

        return NextResponse.json(updated);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server eroor.Please try again later" }, { status: 500 });
    }
}
