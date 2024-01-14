import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 20,
        },
        email: {
            type: String,
            required: true,
            index: true, // if you want to find the user by email
            lowercase: true,
            minLength: 6,
            maxLength: 25,
            unique: true,
        },
        password: String,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        image: String,
        resetCode: {
            data: String,
            expiresAt: {
                type: Date,
                default: () => 
                    new Date(Date.now() + 1000 * 60 * 10) // 10 minutes
            },
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);


userSchema.plugin(uniqueValidator);

export default mongoose.models.User || mongoose.model('User', userSchema);
