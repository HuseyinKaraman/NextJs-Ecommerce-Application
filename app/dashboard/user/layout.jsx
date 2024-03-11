"use client"
import UserNav from "@/components/ui/UserNav";

const UserDasboard = ({ children }) => {
    return (
        <div className="flex flex-col w-full lg:flex-row gap-x-5">
            <UserNav />
            {children}
        </div>
    );
};

export default UserDasboard;
