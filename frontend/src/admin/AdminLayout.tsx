import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
