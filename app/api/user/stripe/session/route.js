import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/currentUser";
import Product from "@/models/product";
import { stripe } from "@/utils/stripe";
// import { getToken } from "next-auth/jwt";

export async function POST(request) {
    await dbConnect();
    const { cartItems, couponCode } = await request.json();
    const user = await currentUser();
    // const token = await getToken({ req: request,secret: process.env.NEXTAUTH_SECRET });
    // const user = token?.user;

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const lineItems = await Promise.all(
            cartItems?.map(async (item) => {
                const product = await Product.findById(item._id);
                const unitAmount = product.price * 100; // convert to cents
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.title,
                            images: [product.images[0].secure_url],
                        },
                        unit_amount: unitAmount,
                    },
                    tax_rates: [process.env.STRIPE_TAX_RATE],
                    quantity: item.quantity,
                };
            })
        );

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            success_url: `${process.env.DOMAIN}/dashboard/user/stripe/success`,
            client_reference_id: user._id,
            payment_method_types: ["card"],
            mode: "payment",
            payment_intent_data: {
                metadata: {
                    cartItems: JSON.stringify(cartItems),
                    userId: user._id.toString(),
                },
            },
            shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE }],
            shipping_address_collection: { allowed_countries: ["TR"] },
            discounts: [{ coupon: couponCode }],
            customer_email: user.email,
        });

        return NextResponse.json(session.url);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
    }
}
