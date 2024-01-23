"use client";
import ListProduct from "@/components/admin/ListProduct";
import Title from "@/components/ui/Title";
import Link from "next/link";

const AdminProduct = () => {

    return (
        <div className="flex flex-col relative md:h-[calc(100vh_-_90px)] w-full md:pr-10">
            <Link
                className="bg-primary text-white p-2 rounded-lg absolute right-10 top-10 hover:cursor-pointer"
                href="/dashboard/admin/product/newProduct"
            >
                <Title addClass={"text-[20px]"}>Add Product</Title>
            </Link>
            <Title addClass={"text-[30px] mb-5 mt-10 border-b-2 h-[52px]"}>
                ListProduct
                <span className="text-sm ml-2">(click to product for selecting)</span>
            </Title>
            <ListProduct />
        </div>
    );
};

export default AdminProduct;
