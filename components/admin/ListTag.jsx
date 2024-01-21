"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";

const ListTag = () => {
    const { tags, setUpdatingTag, fetchTags } = useTag();



    useEffect(() => {
        fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-h-[500px] overflow-auto relative flex gap-4 flex-wrap p-4">
            {tags &&
                tags.map((item) => (
                    <div
                        key={item._id}
                        className="hover:bg-sky-400 hover:cursor-pointer hover-text p-[6px] inline-block bg-slate-300 rounded-lg"
                        onClick={() => setUpdatingTag(item)}
                    >
                        <b>{item.name}</b>
                    </div>
                ))}
        </div>
    );
};

export default ListTag;
