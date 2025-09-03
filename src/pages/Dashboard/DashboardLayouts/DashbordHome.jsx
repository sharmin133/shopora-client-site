// src/pages/Dashboard/DashboardLayouts/DashboardHome.jsx
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AdminDashboard from "../DashboardAdmin/AdminDashboard";
import UserDashboard from "../DashboardUser/UserDashboard";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  if (role === "admin") return <AdminDashboard />;
  if (role === "user") return <UserDashboard />;

  return (
    <div className="p-12">
      <p className="text-red-600 ">Role not recognized or not logged in.</p>
    </div>
  );
};

export default DashboardHome;
