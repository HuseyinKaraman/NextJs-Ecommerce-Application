"use client";
import CreateCategory from "@/components/admin/CreateCategory";
import ListCategory from "@/components/admin/ListCategory";
import Title from "@/components/ui/Title";

const Page = () => {
    return (
        <div className="flex flex-col md:h-[calc(100vh_-_90px)] w-full md:pr-10">
            <Title addClass={"text-[30px] mb-4 border-b-2 h-[52px]"}>CreateCategory</Title>
            <CreateCategory />
            <Title addClass={"text-[30px] mb-5 mt-10 border-b-2 h-[52px]"}>
                ListCategory
                <span className="text-sm ml-2">(click to category for selecting)</span>
            </Title>
            <ListCategory />
        </div>
    );
};

export default Page;
