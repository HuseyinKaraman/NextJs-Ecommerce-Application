import mongoose from "mongoose";
import User from "@/models/user";
import Product from "@/models/product";

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        title: String,
        slug: String,
        price: Number,
        image: String,
        quantity: Number,
    },
    {
        timestamps: true
    }
)


const orderSchema = new mongoose.Schema(
    {
        chargeId: String,
        payment_intent: String,
        receipt_url: String,
        refunded: Boolean,
        status:String,
        amount_captured: Number,
        currency: String,
        shipping: {
            address: {
                country: String,
                city: String,
                line1: String,
                line2: String,
                postal_code: String,
                state: String,
            }
        },
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        cartItems: [cartItemSchema],
        delivered_status: {
            type: String,
            default: "Not Processed",
            enum: ["Not Processed", "Processing", "Dispatched", "Refunded", "Cancelled","Delivered"],   
        }
    },
    {
        timestamps: true,
    }
);



export default mongoose.models.Order || mongoose.model('Order', orderSchema);
