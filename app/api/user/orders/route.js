import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import { currentUser } from "@/utils/currentUser";

export async function GET(req) {
    await dbConnect();
    const user = await currentUser();
    try {
        const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
