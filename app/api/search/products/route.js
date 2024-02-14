import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Category from "@/models/category";
import Tag from "@/models/tag";
import queryString from "query-string";

export async function GET(request) {
    await dbConnect();
    try {
        const { productSearchQuery } = queryString.parseUrl(request.url).query;
        // search categories and tags based on productSearchQuery  , limit can be added
        const [categories, tags] = await Promise.all([
            Category.find({ name: { $regex: productSearchQuery, $options: "i" } }),
            Tag.find({ name: { $regex: productSearchQuery, $options: "i" } }),
        ]);

        const categoryIds = categories.map((category) => category._id);
        const tagIds = tags.map((tag) => tag._id);

        const products = await Product.find({
            $or: [
                { title: { $regex: productSearchQuery, $options: "i" } },
                { description: { $regex: productSearchQuery, $options: "i" } },
                { category: { $in: categoryIds } },
                { tags: { $in: tagIds } },
            ]}).limit(5)
                .populate("category", "name slug")
                .populate("tags", "name slug")
                .sort({ createdAt: -1 });

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
