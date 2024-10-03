import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 w-full p-4 bg-gray-100 dark:bg-gray-900 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
