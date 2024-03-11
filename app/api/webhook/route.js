import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";
import { stripe } from "@/utils/stripe";

export async function POST(req) {
    await dbConnect();
    const _raw = await req.text();
    const sig = req?.headers.get("stripe-signature");

    try {
        // construct event using stripe sdk
        const event = stripe.webhooks.constructEvent(_raw, sig, process.env.STRIPE_WEBHOOK_SECRET);

        // handle the event
        switch (event.type) {
            case "charge.succeeded":
                const chargeSucceeded = event.data.object;
                const { id, ...rest } = chargeSucceeded;
                
                // decrement stock,gather product ids
                const cartItems = JSON.parse(chargeSucceeded.metadata.cartItems);
                const productIds = cartItems.map(item => item._id);

                // fetch all products in one query
                const products = await Product.find({ _id: { $in: productIds } });

                // create an object to quickly map product details by id
                const productMap = {};
                products.forEach(product => {
                    productMap[product._id.toString()] = {
                        _id: product._id,
                        title: product.title,
                        slug: product.slug,
                        price: product.price,
                        image: product.images[0]?.secure_url || ""
                    };
                })

                // create cartItems with product details
                const cartItemsWithProductDetails = cartItems.map(cartItem => {
                    return {
                        ...productMap[cartItem._id],
                        quantity: cartItem.quantity
                    }
                })

                // create order
                const orderData = {
                    ...rest,
                    chargeId: id,
                    userId: chargeSucceeded.metadata.userId,
                    cartItems: cartItemsWithProductDetails
                }

                await Order.create(orderData);


                // decrement product stock
                for (const item of cartItems) {
                    const product = await Product.findById(item._id);
                    if (product) {
                        product.stock = product.stock - item.quantity;
                        await product.save();
                    }
                }

                return NextResponse.json({ ok: true });
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
