"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
export const AdminNav = () => {
    const pathname = usePathname();

    return (
        <ul className="flex md:flex-col font-semibold justify-center md:justify-start mb-5 gap-x-5 md:gap-5 md:mt-16 w-full md:max-w-40">
            <Link
                href="/dashboard/admin"
                className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3 ${
                    pathname === ("/dashboard/admin") && "bg-primary text-white"
                }`}
            >
                <i className="fa fa-cutlery inline-block mr-2 text-xl md:text-2xl"> </i>
                <span>Admin</span>
            </Link>
            <Link
                href="/dashboard/admin/category"
                className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3  ${
                    pathname.includes("/category") && "bg-primary text-white"
                }`}
            >
                <i className="fa fa-motorcycle inline-block mr-2 text-xl md:text-2xl"></i>
                <span>Categories</span>
            </Link>
            <Link
                href="/dashboard/admin/tag"
                className={`hover:bg-primary hover:text-white cursor-pointer  p-1 py-3 lg:p-3  ${
                    pathname.includes("/tag") && "bg-primary text-white"
                }`}
            >
                <i className="fa fa-list inline-block mr-2 text-xl md:text-2xl"> </i>
                <span>Tags</span>
            </Link>
            <Link
                href="/dashboard/admin/product"
                className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3 ${
                    pathname.includes("/product") && "bg-primary text-white"
                }`}
            >
                <i className="fa fa-window-maximize block md:inline-block mr-2 text-xl md:text-2xl"></i>
                <span>Products</span>
            </Link>
        </ul>
    );
};
