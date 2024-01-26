"use client"
import { AdminNav } from "@/components/ui/AdminNav";

const AdminDasboard = ({ children }) => {
    
    return (
        <div className="flex p-2 flex-col w-full lg:flex-row gap-x-5">
            <AdminNav />
            {children}
        </div>
    );
};

export default AdminDasboard;
