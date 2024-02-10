import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(request) {
    try {
        await dbConnect();
        const brands = await Product.distinct("brand");
        return NextResponse.json(brands);
    } catch (error) {
        return NextResponse.json({ error: "An error occurred.Try again later" }, { status: 500 });
    }
}
