"use client";
import { useEffect, useState } from "react";
import Title from "../ui/Title";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import PopConfirm from "../ui/PopConfirm";

const AddProduct = () => {
    const {
        product,
        setProduct,
        products,
        updatingProduct,
        setUpdatingProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploading,
        isLoading,
        setUploading,
        uploadImages,
        deleteImage,
    } = useProduct();
    const { categories, fetchCategories } = useCategory();
    const { tags, fetchTags } = useTag();
    const [filterTags, setFilterTags] = useState([]);
    const [confirm, setConfirm] = useState(false);

    const imagePreviews = updatingProduct ? updatingProduct?.images ?? [] : product?.images ?? [];

    useEffect(() => {
        fetchCategories();
        fetchTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilterTags(tags?.filter((tag) => tag.parentCategory === updatingProduct?.category?._id) ?? []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tags]);

    return categories.length > 0 && tags.length > 0 ? (
        <div className="w-full h-full text-black md:pr-5">
            <Title addClass={"text-[40px] text-start border-b-2"}>
                {updatingProduct ? "Update" : "Create"} Product
            </Title>
            <div className="flex flex-col gap-y-5 mt-4 w-full">
                <div className="flex flex-col text-sm">
                    <span className="font-semibold mb-2">Title</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="border-2 border-black p-2 outline-none"
                        value={updatingProduct ? updatingProduct?.title : product?.title}
                        onChange={(e) =>
                            updatingProduct
                                ? setUpdatingProduct({ ...updatingProduct, title: e.target.value })
                                : setProduct({ ...product, title: e.target.value })
                        }
                    />
                </div>

                <div className="flex flex-col text-sm">
                    <span className="font-semibold mb-2">Description</span>
                    <textarea
                        name="desc"
                        cols="30"
                        rows="2"
                        placeholder="Description"
                        className="border-2 border-black p-2 outline-none"
                        onChange={(e) =>
                            updatingProduct
                                ? setUpdatingProduct({ ...updatingProduct, description: e.target.value })
                                : setProduct({ ...product, description: e.target.value })
                        }
                        value={updatingProduct ? updatingProduct?.description : product?.description}
                    ></textarea>
                </div>

                <div className="flex gap-5 text-sm">
                    <div className="flex flex-col flex-1">
                        <span className="font-semibold mb-2">Price</span>
                        <input
                            type="number"
                            name="price"
                            min={1}
                            placeholder="Price"
                            className="border-2 border-black p-2 outline-none"
                            value={updatingProduct ? updatingProduct?.price : product?.price}
                            onChange={(e) =>
                                updatingProduct
                                    ? setUpdatingProduct({ ...updatingProduct, price: e.target.value })
                                    : setProduct({ ...product, price: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <span className="font-semibold mb-2">Stock</span>
                        <input
                            type="number"
                            name="stock"
                            min={1}
                            placeholder="Stock"
                            className="border-2 border-black p-2 outline-none"
                            value={updatingProduct ? updatingProduct?.stock : product?.stock}
                            onChange={(e) =>
                                updatingProduct
                                    ? setUpdatingProduct({ ...updatingProduct, stock: e.target.value })
                                    : setProduct({ ...product, stock: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="flex gap-5 text-sm">
                    <div className="flex flex-col flex-1">
                        <span className="font-semibold mb-2">Color</span>
                        <input
                            type="text"
                            name="color"
                            placeholder="Color"
                            className="border-2 border-black p-2 outline-none"
                            value={updatingProduct ? updatingProduct?.color : product?.color}
                            onChange={(e) =>
                                updatingProduct
                                    ? setUpdatingProduct({ ...updatingProduct, color: e.target.value })
                                    : setProduct({ ...product, color: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col  flex-1">
                        <span className="font-semibold mb-2">Brand</span>
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            className="border-2 border-black p-2 outline-none"
                            value={updatingProduct ? updatingProduct?.brand : product?.brand}
                            onChange={(e) =>
                                updatingProduct
                                    ? setUpdatingProduct({ ...updatingProduct, brand: e.target.value })
                                    : setProduct({ ...product, brand: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="flex gap-5 text-sm">
                    <div className="flex flex-col flex-1">
                        <span className="font-semibold mb-2">Categories</span>
                        <select
                            name="category"
                            className="border-2 border-black p-2"
                            value={updatingProduct ? updatingProduct?.category?._id : product?.category?._id}
                            onChange={(e) => {
                                const categoryId = e.target.value;
                                const categoryName = e.target.options[e.target.selectedIndex].getAttribute("data-name");

                                const category = categoryId ? { _id: categoryId, name: categoryName } : null;

                                if (updatingProduct) {
                                    setUpdatingProduct({ ...updatingProduct, category });
                                } else {
                                    setProduct({ ...product, category });
                                }
                                setFilterTags(tags.filter((t) => t?.parentCategory === categoryId));
                            }}
                        >
                            {categories ? (
                                categories.map((item) => (
                                    <option value={item._id} key={item._id} data-name={item.name}>
                                        {item.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">SELECT CATEGORY</option>
                            )}
                        </select>
                    </div>
                    <div className={`flex flex-col flex-1 h-36`}>
                        <span className="font-semibold mb-2">Tags</span>
                        <div name="tags" className="flex flex-wrap gap-2 overflow-auto">
                            {filterTags?.map((item) => (
                                <div key={item?._id}>
                                    <label htmlFor={item?._id} className="text-xs md:text-[18px] mr-1">
                                        {item?.name}
                                    </label>
                                    <input
                                        type="checkbox"
                                        name={item?._id}
                                        value={item?._id}
                                        defaultChecked={
                                            updatingProduct?.tags?.find((t) => t?._id === item?._id) ? true : false
                                        }
                                        onChange={(e) => {
                                            const tagId = e.target.value;
                                            const tagName = item?.name;

                                            const selected = e.target.checked;

                                            let selectedTags = updatingProduct
                                                ? [...(updatingProduct?.tags ?? [])]
                                                : [...(product?.tags ?? [])];

                                            if (!selected) {
                                                selectedTags = selectedTags.filter((t) => t._id !== tagId);
                                            } else {
                                                selectedTags.push({ _id: tagId, name: tagName });
                                            }

                                            if (updatingProduct) {
                                                setUpdatingProduct({
                                                    ...updatingProduct,
                                                    tags: selectedTags,
                                                });
                                            } else {
                                                setProduct({ ...product, tags: selectedTags });
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col gap-5 text-sm h-40`}>
                    <label className={`btn w-full !bg-slate-600 text-center`}>
                        {uploading ? "Processing" : "Upload Images"}
                        <input
                            name="img"
                            type="file"
                            className="hidden w-full"
                            multiple
                            accept="image/*"
                            onChange={uploadImages}
                            disabled={uploading}
                        />
                    </label>
                    {imagePreviews && (
                        <div className="relative flex gap-5 mt-2">
                            {imagePreviews.map((image) => (
                                <div key={image.public_id} className="relative drop-shadow-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={image?.secure_url}
                                        alt="product"
                                        className="!object-cover w-24 h-24 rounded-full mb-2"
                                    />
                                    <i
                                        className="z-50 fa-solid fa-xmark absolute -bottom-2 right-3 text-xl cursor-pointer text-red-500"
                                        title="Delete"
                                        onClick={() => deleteImage(image.public_id)}
                                    ></i>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4 relative ml-auto w-[500px]">
                <button
                    className="btn text-xl !bg-orange-400 !w-44 block"
                    onClick={updatingProduct ? updateProduct : createProduct}
                    // disabled={!name && !updatingCategory}
                    disabled={isLoading || uploading}
                >
                    {updatingProduct ? "Update" : "Create"}
                </button>
                {updatingProduct && (
                    <>
                        <button
                            className="btn-primary !bg-danger !w-44 text-white p-4"
                            onClick={() => {
                                setConfirm(true);
                            }}
                            disabled={isLoading || uploading}
                        >
                            Delete
                        </button>
                        <button
                            className="btn-primary text-white !w-44 !bg-sky-600"
                            onClick={() => window.location.reload()}
                        >
                            Clear
                        </button>
                    </>
                )}
            </div>
            {confirm && (
                <PopConfirm
                    setConfirm={setConfirm}
                    question={`Are you sure you want to delete ${updatingProduct?.title.substring(0, 20)}..?`}
                    sendRequest={deleteProduct}
                />
            )}
        </div>
    ) : (
        <div className="w-full h-full flex justify-center items-center text-black md:pr-5">LOADING...</div>
    );
};

export default AddProduct;
