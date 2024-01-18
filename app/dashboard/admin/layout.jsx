"use client"
import { AdminNav } from "@/components/ui/AdminNav";

const AdminDasboard = ({ children }) => {
    
    return (
        <div className="flex p-2 flex-col md:flex-row gap-x-20">
            <AdminNav />
            {children}
        </div>
    );
};

export default AdminDasboard;
