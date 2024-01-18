"use client";
import { useEffect } from "react";
import { useCategory } from "@/context/category";

const ListCategory = () => {
    const { categories, setUpdatingCategory, fetchCategories } = useCategory();



    useEffect(() => {
        fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-h-[500px] overflow-auto relative flex gap-4 flex-wrap p-4">
            {categories &&
                categories.map((item) => (
                    <div
                        key={item._id}
                        className="hover:bg-sky-400 hover:cursor-pointer hover-text p-[6px] inline-block bg-slate-300 rounded-lg"
                        onClick={() => setUpdatingCategory(item)}
                    >
                        <b>{item.name}</b>
                    </div>
                ))}
        </div>
    );
};

export default ListCategory;
