import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();

    // console.table({session, status})

    return (
        <nav className="flex p-2 px-5 justify-between bg-gray-100 mb-3 border-2 shadow-sm drop-shadow-md">
            <Link href={"/"} className="text-lg text-blue-400">
                🛒 NEXTECOM
            </Link>

            <div className="flex justify-end items-center gap-5">
                {status === "authenticated" ? (
                    <>
                        <Link href={`/dashboard/${session?.user?.role}`} className="text-lg text-blue-400">
                            {session?.user?.name} ({session?.user?.role.toUpperCase()})
                        </Link>
                        <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-blue-400 text-lg">
                            SIGN OUT
                        </button>
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