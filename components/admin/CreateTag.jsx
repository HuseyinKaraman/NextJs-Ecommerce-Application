"use client";
import Input from "../form/Input";
import { useTag } from "@/context/tag";
import { useCategory } from "@/context/category";
import PopConfirm from "../PopConfirm";
import { useEffect, useState } from "react";

const TagCreate = () => {
    const [confirm, setConfirm] = useState(false);
    const { name, setName, parentCategory, setParentCategory, updatingTag, setUpdatingTag, createTag, updateTag, deleteTag} = useTag();
    const { fetchCategories, categories } = useCategory();

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex gap-3 flex-col h-44">
            <Input
                name="name"
                type="text"
                placeholder="Add new a tag"
                onChange={(e) => updatingTag ? setUpdatingTag({ ...updatingTag, name: e.target.value }): setName(e.target.value)}
                value={updatingTag ? updatingTag.name : name}
            />
            <div className="">
                <label htmlFor="parentCategory" className="inline-block mb-2">
                    Parent Category
                </label>
                <select
                    name="parentCategory"
                    className="w-full p-3 bg-white border-2 rounded-lg shadow-sm  border-primary sm:text-sm"
                    onChange={
                        (e) =>updatingTag ? 
                        setUpdatingTag({ ...updatingTag, parentCategory: e.target.value }) : setParentCategory(e.target.value)
                    }
                    value={updatingTag ? updatingTag.parentCategory : parentCategory}
                >
                    <option value="">Select a category</option>
                    {categories &&
                        categories.map((item) => (
                            <option
                                key={item._id}
                                value={item._id}
                                // selected={item._id === updatingTag?.parentCategory || item._id === parentCategory}
                            >
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="flex gap-4">
                <button
                    className="btn-primary text-white"
                    onClick={updatingTag ? updateTag : createTag}
                    disabled={!name && parentCategory === "" && parentCategory && !updatingTag}
                >
                    {updatingTag ? "Update" : "Create"}
                </button>
                {updatingTag && (
                    <>
                        <button
                            className="btn-primary !bg-danger text-white p-4"
                            onClick={() => {
                                setConfirm(true);
                            }}
                        >
                            Delete
                        </button>
                        <button className="btn-primary text-white !bg-sky-600" onClick={() => setUpdatingTag(null)}>
                            Clear
                        </button>
                    </>
                )}
            </div>
            {confirm && (
                <PopConfirm
                    setConfirm={setConfirm}
                    message={`Are you sure you want to delete ${updatingTag?.name}?`}
                    sendRequest={deleteTag}
                    addClass={"md:!bottom-[400px] md:!left-80"}
                />
            )}
        </div>
    );
};

export default TagCreate;
