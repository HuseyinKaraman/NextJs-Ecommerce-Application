import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, parentCategory } = body;
        const newTag = await Tag.create({ name, parentCategory, slug: slugify(name) });
        return NextResponse.json(newTag, { status: 201 });
    } catch (error) {
        const err = error?.errors;
        return NextResponse.json({ error: err?.slug ? err.slug?.properties?.message : error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const tags = await Tag.find({}).sort({ createdAt: -1 });
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
