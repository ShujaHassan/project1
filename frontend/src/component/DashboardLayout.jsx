import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login if token not found
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
