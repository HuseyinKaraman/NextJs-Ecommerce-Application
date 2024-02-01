import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const product = await Product.findOne({ slug: params.slug })
            .populate({
                path: "category",
                select: "name slug",
            })
            .populate({
                path: "tags",
                select: "name parentCategory slug",
            });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
