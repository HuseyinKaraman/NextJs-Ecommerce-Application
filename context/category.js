"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [updatingCategory, setUpdatingCategory] = useState(null);

    const createCategory = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/admin/category`, {
                name,
            });
            if (res.status === 201) {
                toast.success("Category added successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setCategories([...categories, res.data]);
                setName("");
            }
        } catch (error) {
            const message = error?.response?.data?.error ? error.response.data.error : "Something went wrong";
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/category`);
            if (res.status === 200) {
                setCategories(res.data);
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const deleteCategory = async () => {
        try {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/category/${updatingCategory?._id}`
            );
            if (res.status === 200) {
                toast.success("Category deleted successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setCategories(categories.filter((item) => item._id !== updatingCategory?._id));
                setUpdatingCategory(null);
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const updateCategory = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${updatingCategory?._id}`, {
                name: updatingCategory.name,
            });
            if (res.status === 200) {
                toast.success("Category updated successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setUpdatingCategory(null);
                setCategories(categories.map((item) => (item._id === updatingCategory?._id ? res.data : item)));
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <CategoryContext.Provider
            value={{
                name,
                categories,
                updatingCategory,
                setName,
                setCategories,
                setUpdatingCategory,
                createCategory,
                fetchCategories,
                deleteCategory,
                updateCategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);
