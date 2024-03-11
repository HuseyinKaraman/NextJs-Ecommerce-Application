import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Order from "@/models/order";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";
import { stripe } from "@/utils/stripe";

export async function POST(req) {
    await dbConnect();
    try {
        const user = await currentUser();
        const orderId = req.nextUrl?.searchParams?.get("orderId");
        
        const order = await Order.findById(orderId);
        // check if order belongs to user
        if (!order || (order.userId.toString() !== user._id.toString())) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // check if order is still 'Not Processed'
        if (order.delivery_status !== "Not Processed") {
            return NextResponse.json({ error: "Order cannot be cancelled" }, { status: 400 });
        }
        
        // make the refund request to stripe
        const refund = await stripe.refunds.create({
            payment_intent: order.payment_intent,
            reason: "requested_by_customer",
        })  

        // update the product quantities in the database on the refunded items
        for (const cartItem of order.cartItems) {
            const product = await Product.findById(cartItem?._id);
            product.quantity = product.quantity + cartItem?.quantity;
            await product.save();
        }


        //  update the order in the database with refund details
        order.status = "Refunded";
        order.refunded = true;
        order.delivery_status = "Cancelled";
        order.refundId = refund.id;
        await order.save();

        return NextResponse.json({ message: "Order cancelled successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
