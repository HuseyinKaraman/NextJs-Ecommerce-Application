import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";

// get likes products by user
export async function GET(request) {
    await dbConnect();
    const user = await currentUser();

    try {
        const likedProducts = await Product.find({ likes: user._id });
        return NextResponse.json(likedProducts);
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}

export async function PUT(request) {
    await dbConnect();
    const user = await currentUser();
    const { productId } = await request.json();

    try {
        const updated = await Product.findByIdAndUpdate(
            productId,
            {
                $addToSet: { likes: user._id }, // for adding unique values, avoid duplicates id
            },
            {
                new: true,
            }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
