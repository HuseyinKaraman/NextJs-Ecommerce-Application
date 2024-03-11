import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/product";
import slugify from "slugify";

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const body = await request.json();
        const updatedProduct = await Product.findByIdAndUpdate(
            params.id,
            { ...body, slug: slugify(body.title) },
            { new: true }
        );
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const deletedProduct = await Product.findByIdAndDelete(params.id);
        return NextResponse.json(deletedProduct);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
