"use client"
import { useState } from "react";

export const AdminNav = ({ image }) => {
    const [tabs, setTabs] = useState(0);
    const [confirm, setConfirm] = useState(false);

    return (
            <ul className="flex md:flex-col font-semibold justify-center md:justify-start mb-5 md:gap-5 md:mt-16 w-full md:max-w-40">
                <li
                    className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3 ${
                        tabs === 0 && "bg-primary text-white"
                    }`}
                    onClick={() => setTabs(0)}
                >
                    <i className="fa fa-cutlery inline-block mr-2 text-xl md:text-2xl"> </i>
                    <span>Admin</span>
                </li>
                <li
                    className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3  ${
                        tabs === 1 && "bg-primary text-white"
                    }`}
                    onClick={() => setTabs(1)}
                >
                    <i className="fa fa-motorcycle inline-block mr-2 text-xl md:text-2xl"></i>
                    <span>Categories</span>
                </li>
                <li
                    className={`hover:bg-primary hover:text-white cursor-pointer  p-1 py-3 lg:p-3  ${
                        tabs === 2 && "bg-primary text-white"
                    }`}
                    onClick={() => setTabs(2)}
                >
                    <i className="fa fa-list inline-block mr-2 text-xl md:text-2xl"> </i>
                    <span>Products</span>
                </li>
                <li
                    className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3 ${
                        tabs === 3 && "bg-primary text-white"
                    }`}
                    onClick={() => setTabs(3)}
                >
                    <i className="fa fa-window-maximize block md:inline-block mr-2 text-xl md:text-2xl"></i>
                    <span>Orders</span>
                </li>
            </ul>
    );
};
