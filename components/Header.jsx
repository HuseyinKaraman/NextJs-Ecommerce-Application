import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();

    // console.table({session, status})

    return (
        <nav className="flex py-4 text-[18px] md:text-xl px-5 justify-between text-white  bg-gray-600">
            <Link href={"/"}>🛒ECOM</Link>
            <div className="flex justify-end items-center gap-x-3 md:gap-5">
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
