import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";

export async function PUT(req, { params }) {
    await dbConnect();
    const { delivery_status } = await req.json();

    try {
        const updatedOrder = await Order.findByIdAndUpdate(params.orderId,{delivery_status},{ new: true });

        return NextResponse.json(updatedOrder);
    } catch (error) {}
}
