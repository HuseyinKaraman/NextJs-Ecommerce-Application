import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newProduct = await Product.create({ ...body, slug: slugify(body.title) });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        const err = error?.errors;
        return NextResponse.json(
            { error: err?.slug ? err.slug?.properties?.message : error.message },
            { status: 500 }
        );
    }
}