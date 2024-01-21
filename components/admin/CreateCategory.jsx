"use client";
import Input from "../form/Input";
import { useCategory } from "@/context/category";
import PopConfirm from "../ui/PopConfirm";
import { useState } from "react";

const CategoryCreate = () => {
    const [confirm, setConfirm] = useState(false);
    const { name, setName, updatingCategory, setUpdatingCategory, createCategory, updateCategory, deleteCategory } =
        useCategory();

    return (
        <div className="flex gap-3 flex-col h-32">
            <Input
                name="name"
                type="text"
                placeholder="Add new a category"
                onChange={(e) => updatingCategory ? setUpdatingCategory({ ...updatingCategory, name: e.target.value }): setName(e.target.value)}
                value={updatingCategory ? updatingCategory.name : name}
            />
            <div className="flex gap-4">
                <button
                    className="btn-primary text-white"
                    onClick={updatingCategory ? updateCategory : createCategory}
                    disabled={!name && !updatingCategory}
                >
                    {updatingCategory ? "Update" : "Create"}
                </button>
                {updatingCategory && (
                    <>
                        <button
                            className="btn-primary !bg-danger text-white p-4"
                            onClick={() => {
                                setConfirm(true);
                            }}
                        >
                            Delete
                        </button>
                        <button className="btn-primary text-white !bg-sky-600" onClick={() => setUpdatingCategory(null)}>
                            Clear
                        </button>
                    </>
                )}
            </div>
            {confirm && (
                <PopConfirm
                    setConfirm={setConfirm}
                    question={`Are you sure you want to delete ${updatingCategory?.name}?`}
                    sendRequest={deleteCategory}
                    addClass={"md:!bottom-[400px] md:!left-80"}
                />
            )}
        </div>
    );
};

export default CategoryCreate;
