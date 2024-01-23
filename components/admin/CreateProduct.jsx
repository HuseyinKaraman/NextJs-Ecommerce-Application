"use client";
import { useEffect } from "react";
import Title from "../ui/Title";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import Image from "next/image";

const AddProduct = ({ setIsProductModal }) => {
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
        setUploading,
        uploadImages,
        deleteImage,
    } = useProduct();
    const { categories, fetchCategories } = useCategory();
    const { tags, fetchTags } = useTag();

    const imagePreviews = updatingProduct ? updatingProduct?.images ?? [] : product?.images ?? [];

    useEffect(() => {
        fetchCategories();
        fetchTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-full text-black md:pr-5">
            <Title addClass={"text-[40px] text-start border-b-2"}>
                {updatingProduct ? "Update" : "Create"} Product
            </Title>
            <div className="flex flex-col gap-y-5 w-full">
                <div className="flex gap-20 mt-4 items-center justify-start text-sm">
                    <label
                        className={`btn-primary !text-center !w-40 !px-0 ${uploading && "disabled:cursor-not-allowed"}`}
                    >
                        {uploading ? "Processing" : "Upload Images"}
                        <input
                            name="img"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={uploadImages}
                            disabled={uploading}
                        />
                    </label>
                    {imagePreviews && (
                        <div className="relative flex gap-5">
                            {imagePreviews.map((image) => (
                                <div key={image.public_id} className="w-24 h-24">
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={image?.secure_url}
                                        alt="product"
                                        className="object-cover w-24 h-24 rounded-full"
                                    />
                                    <i
                                        className="fa-solid fa-xmark w-full mt-1 text-red-500 text-center cursor-pointer"
                                        onClick={() => deleteImage(image.public_id)}
                                        title="Delete"
                                    ></i>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
                        }}
                    >
                        {categories &&
                            categories.map((item) => (
                                <option value={item._id} key={item._id} data-name={item.name}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex flex-col text-sm">
                    <span className="font-semibold mb-2">Tags</span>
                    <div name="tags" className="flex flex-wrap gap-5 max-h-20 overflow-auto">
                        {tags &&
                            tags
                                .filter(
                                    (t) =>
                                        t?.parentCategory === (product?.category?._id || updatingProduct?.category?._id)
                                )
                                .map((item) => (
                                    <div key={item?._id}>
                                        <label htmlFor={item?._id} className="mr-2">
                                            {item?.name}
                                        </label>
                                        <input
                                            type="checkbox"
                                            value={item?._id}
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
                                                    setUpdatingProduct({ ...updatingProduct, tags: selectedTags });
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
            <button className="btn text-xl !bg-green-500 block mt-5 !ml-auto" type="button">
                Create
            </button>
            <pre>
                <code>{JSON.stringify(product, null, 4)}</code>
            </pre>
        </div>
    );
};

export default AddProduct;
