"use client";

import { useProduct } from "@/context/product";

const Modal = ({ children }) => {
    const { closeModal } = useProduct();

    return (
        <div className="modal fixed inset-0 bg-black bg-opacity-30 z-20 cursor-pointer">
            <div className="w-full h-full flex justify-center items-center" onClick={() => closeModal(false)}>
                <div className="relative flex flex-col gap-2">
                    <div className="absolute top-3 right-3">
                        <i className="fa fa-times text-2xl cursor-pointer bg-black text-white rounded-full p-2 hover:opacity-85 transition-all hover:text-red-600"
                            onClick={() => {
                                closeModal(false);
                            }}
                        ></i>
                    </div>
                    <div className="p-2" onClick={(e) => e.stopPropagation()}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
