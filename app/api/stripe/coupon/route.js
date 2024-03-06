import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { stripe } from "@/utils/stripe";

export async function POST(request) {
    await dbConnect();
    const { couponCode } = await request.json();

    try {
        const coupon = await stripe.coupons.retrieve(couponCode);
        return NextResponse.json(coupon);
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
