import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Category from "./category";
import Tag from "./tag";
import User from "./user";

const ratingSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            maxLength: 200,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            minLength: 1,
            maxLength: 160,
            text: true, // the reason for text search
        },
        slug: {
            type: String,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            maxLength: 6,
            validate: {
                validator: (v) => {
                    return v > 0;
                },
                message: "Price must be greater than 0",
            },
        },
        previousPrice: Number,
        color: String,
        brand: String,
        stock: Number,
        shipping: {
            type: Boolean,
            default: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        images: [
            {
                secure_url: {
                    type: String,
                    default: "",
                },
                public_id: {
                    type: String,
                    default: "",
                },
            },
        ],
        sold: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        ratings: [ratingSchema],
    },
    {
        timestamps: true,
    }
);

productSchema.plugin(uniqueValidator, "is already taken.");

export default mongoose.models.Product || mongoose.model("Product", productSchema);
