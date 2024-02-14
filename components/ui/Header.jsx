"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/product";

const Header = () => {
    const { data: session, status } = useSession();
    const { productSearchQuery, setProductSearchQuery, fetchProductSearchResults } = useProduct();

    return (
        <nav className="flex gap-y-5 flex-wrap md:flex-nowrap py-4 text-[18px] md:text-xl px-5 justify-between text-white bg-gray-600">
            <div className="flex gap-5 lg:gap-10 order-1">
                <Link href={"/"} className="">
                    🛒ECOM
                </Link>
                <Link href={"/shop"}>SHOP</Link>
            </div>

            <form className="flex gap-2 w-full md:w-[350px] order-3 md:order-2" onSubmit={fetchProductSearchResults}>
                <div className="relative flex-1">
                    <input
                        type="search"
                        placeholder="Search products"
                        className="p-1 pl-2 rounded-xl text-black w-full"
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                    />
                    {productSearchQuery && (
                        <span
                            className="absolute right-4 top-1 !text-[16px] text-black cursor-pointer hover:text-red-600"
                            onClick={() => setProductSearchQuery("")}
                        >
                            X
                        </span>
                    )}
                </div>
                <button className="p-1" type="submit">
                    &#128269;
                </button>
            </form>

            <div className="flex justify-end items-center gap-x-3 md:gap-5 order-2 md:order-3">
                {status === "authenticated" ? (
                    <>
                        <Link href={`/dashboard/${session?.user?.role}`}>
                            {session?.user?.name} ({session?.user?.role.toUpperCase()})
                        </Link>
                        <button onClick={() => signOut({ callbackUrl: "/login" })}>SIGN OUT</button>
                    </>
                ) : status === "loading" ? (
                    <span className="text-danger">LOADING..</span>
                ) : (
                    <>
                        <Link href={"/login"} className="text-lg text-blue-400">
                            LOGIN
                        </Link>
                        <Link href={"/register"} className="text-lg text-blue-400">
                            REGISTER
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
