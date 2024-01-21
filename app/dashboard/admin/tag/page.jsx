"use client";
import CreateTag from "@/components/admin/CreateTag";
import ListTag from "@/components/admin/ListTag";
import Title from "@/components/ui/Title";

const AdminTag = () => {
    return (
        <div className="flex flex-col md:h-[calc(100vh_-_90px)] w-full md:pr-10">
            <Title addClass={"text-[30px] mb-4 border-b-2 h-[52px]"}>CreateTag</Title>
            <CreateTag />
            <Title addClass={"text-[30px] mb-5 mt-10 border-b-2 h-[52px]"}>
                ListTag
                <span className="text-sm ml-2">(click to tag for selecting)</span>
            </Title>
            <ListTag />
        </div>
    );
};

export default AdminTag;
