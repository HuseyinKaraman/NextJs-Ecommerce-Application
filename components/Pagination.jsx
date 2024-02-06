"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Pagination = ({ totalPages, currentPage }) => {
    const pathname = usePathname();
    return (
        <div className="flex gap-x-2 justify-center items-start">
            {Array.from({ length: totalPages }, (_, index) => (
                <Link
                    key={index + 1}
                    className={`btn inline-block mb-2 ${currentPage === index + 1 && "!bg-primary"}`}
                    href={`${pathname}?page=${index + 1}`}
                    as={`${pathname}?page=${index + 1}`}
                >
                    {index + 1}
                </Link>
            ))}
        </div>
    );
};

export default Pagination;
