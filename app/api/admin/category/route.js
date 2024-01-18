import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name } = body;
        const newCategory = await Category.create({ name, slug: slugify(name) });
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        const err = error?.errors;
        return NextResponse.json(
            { error: err?.slug ? err.slug?.properties?.message : error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find({}).sort({ createdAt: -1 });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
