import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-screen flex-col gap-4">
            <h1 className="text-4xl font-semibold">404</h1>
            <div>
                <Link href={"/"} className="btn">Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
