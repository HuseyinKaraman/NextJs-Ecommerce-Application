import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Tag from "@/models/tag";


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
