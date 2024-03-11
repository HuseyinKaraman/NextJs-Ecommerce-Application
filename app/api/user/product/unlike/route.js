import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";

export async function PUT(request) {
    await dbConnect();
    const user = await currentUser();
    const { productId } = await request.json();

    try {
        const updated = await Product.findByIdAndUpdate(
            productId,
            {
                $pull: { likes: user._id },
            },
            {
                new: true,
            }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
