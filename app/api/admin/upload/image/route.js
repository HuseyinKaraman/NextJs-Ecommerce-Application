import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    const { image } = await request.json();

    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "next-ecommerce",
        });
        return NextResponse.json({ public_id: result.public_id, secure_url: result.secure_url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { public_id } = await request.json();
        const result = await cloudinary.uploader.destroy(public_id);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
