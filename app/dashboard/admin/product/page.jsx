"use client";
import ListProduct from "@/components/admin/ListProduct";
import Title from "@/components/ui/Title";
import Link from "next/link";

const AdminProduct = () => {

    return (
        <div className="relative flex flex-col w-full md:h-[calc(100vh_-_80px)] md:pr-5">
            <Link
                className="bg-primary text-white p-2 rounded-lg absolute right-5 top-8 hover:cursor-pointer"
                href="/dashboard/admin/product/newProduct"
            >
                <Title addClass={"text-[20px]"}>Add Product</Title>
            </Link>
            <Title addClass={"text-[30px] mb-5 mt-10 border-b-2 h-[55px]"}>
                ListProduct
            </Title>
            <ListProduct />
        </div>
    );
};

export default AdminProduct;
