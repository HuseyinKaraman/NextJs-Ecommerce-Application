import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { name, email, password } = body;
        const newUser = await new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        }).save();
        return NextResponse.json({ success: "Registered successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error?.errors?.properties?.message ? error.errors.properties.message : error.message },
            { status: 500 }
        );
    }
}
