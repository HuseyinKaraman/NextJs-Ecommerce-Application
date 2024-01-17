import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";


export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name } = body;
        const updatedCategory = await Category.findByIdAndUpdate(
            params.id,
            { name, slug: slugify(name) },
            { new: true }
        );
        return NextResponse.json(updatedCategory);
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
        const deletedCategory = await Category.findByIdAndDelete(params.id);
        return NextResponse.json(deletedCategory);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
