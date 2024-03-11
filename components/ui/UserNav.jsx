"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
const UserNav = () => {
    const pathname = usePathname();

    return (
        <ul className="flex lg:flex-col font-semibold justify-center lg:justify-start my-2 gap-x-5 lg:gap-5 lg:mt-16 w-full lg:max-w-40">
            <Link
                href="/dashboard/user"
                className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3 ${
                    pathname === ("/dashboard/user") && "bg-primary text-white"
                }`}
            >
                <i className="fa fa-cutlery inline-block mr-2 text-xl md:text-2xl"> </i>
                <span>Dashboard</span>
            </Link>
            <Link
                href="/dashboard/user/orders"
                className={`hover:bg-primary hover:text-white cursor-pointer p-1 py-3 lg:p-3  ${
                    pathname.includes("/orders") && "bg-primary text-white"
                }`}
            >
                <i className="fa fa-motorcycle inline-block mr-2 text-xl md:text-2xl"></i>
                <span>Orders</span>
            </Link>
        </ul>
    );
};


export default UserNav;