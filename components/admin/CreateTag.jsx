"use client";
import Input from "../form/Input";
import { useTag } from "@/context/tag";
import PopConfirm from "../ui/PopConfirm";
import { useState } from "react";

const TagCreate = () => {
    const [confirm, setConfirm] = useState(false);
    const {
        name,
        setName,
        parentCategory,
        setParentCategory,
        updatingTag,
        setUpdatingTag,
        createTag,
        updateTag,
        deleteTag,
    } = useTag();

    return (
        <div className="flex gap-3 flex-col h-32">
            <Input
                name="name"
                type="text"
                placeholder="Add new a tag"
                onChange={
                    updatingCategory
                        ? (e) => setUpdatingTag({ ...updatingTag, name: e.target.value })
                        : (e) => setName(e.target.value)
                }
                value={updatingCategory ? updatingCategory.name : name}
            />
            <div className="flex gap-4">
                <button
                    className="btn-primary text-white"
                    onClick={updatingTag ? updateTag : createTag}
                    disabled={!name && !updatingTag}
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
                        <button
                            className="btn-primary text-white !bg-sky-600"
                            onClick={() => setUpdatingTag(null)}
                        >
                            Clear
                        </button>
                    </>
                )}
            </div>
            {confirm && (
                <PopConfirm
                    setConfirm={setConfirm}
                    question={`Are you sure you want to delete ${updatingTag?.name}?`}
                    sendRequest={deleteTag}
                    addClass={"md:!bottom-[400px] md:!left-80"}
                />
            )}
        </div>
    );
};

export default TagCreate;
