"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [updatingTag, setUpdatingTag] = useState(null);

    const createTag = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/admin/tag`, {
                name,
                parentCategory
            });
            if (res.status === 201) {
                toast.success("Tag added successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setName("");
                // setParentCategory("");
                setTags([...tags, res.data]);
            }
        } catch (error) {
            const message = error?.response?.data?.error ? error.response.data.error : "Error creating tag";
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const fetchTags = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/tag`);
            if (res.status === 200) {
                setTags(res.data);
            }
        } catch (error) {
            toast.error("Error fetching tag", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const deleteTag = async () => {
        try {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/tag/${updatingTag?._id}`
            );
            if (res.status === 200) {
                toast.success("Tag deleted successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setTags((prev)=>prev.filter((item) => item._id !== res?.data?._id));
                setUpdatingTag(null);
            }
        } catch (error) {
            toast.error("Error deleting tag", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const updateTag = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/tag/${updatingTag?._id}`, {
                name: updatingTag.name,
                parentCategory : updatingTag.parentCategory
            });
            if (res.status === 200) {
                toast.success("Tag updated successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setUpdatingTag(null);
                setParentCategory("");
                setTags((prev)=>prev.map((item)=>item._id === res?.data._id ? res?.data : item));
            }
        } catch (error) {
            toast.error("Error updating tag", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <TagContext.Provider
            value={{
                name,
                parentCategory,
                tags,
                updatingTag,
                setName,
                setParentCategory,
                setTags,
                setUpdatingTag,
                createTag,
                fetchTags,
                deleteTag,
                updateTag,
            }}
        >
            {children}
        </TagContext.Provider>
    );
};

export const useTag = () => useContext(TagContext);
