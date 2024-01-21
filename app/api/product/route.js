import Product from "@/models/product";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import queryString from "query-string";

export async function GET() {
    try {
        await dbConnect();
        const searchParams = queryString.parseUrl(req.url).query;
        const { page } = searchParams || {};
        const pageSize = 6;

        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * pageSize;
        const totalProducts = await Product.countDocuments({});

        const products = await Product.find({}).skip(skip).limit(pageSize).sort({ createdAt: -1 });

        return NextResponse.json({ products, currentPage, totalPages: Math.ceil(totalProducts / pageSize) });
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}