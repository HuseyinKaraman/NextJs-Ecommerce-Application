import { AdminNav } from "@/components/ui/AdminNav";

const AdminDasboard = ({ children }) => {
    return (
        <div className="flex p-2 flex-col md:flex-row gap-x-20">
            <AdminNav />
            <div className="flex flex-col w-full">
                <p className="text-3xl border-b-2 mb-5">Admin DashBoard</p>
                {children}
            </div>
        </div>
    );
};

export default AdminDasboard;
