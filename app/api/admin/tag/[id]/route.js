import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name } = body;
        const updatedTag = await Tag.findByIdAndUpdate(params.id, { ...body, slug: slugify(name) }, { new: true });
        return NextResponse.json(updatedTag);
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
        const deletedTag = await Tag.findByIdAndDelete(params.id);
        return NextResponse.json(deletedTag);
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
