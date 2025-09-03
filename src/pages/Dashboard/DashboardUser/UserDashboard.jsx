// src/pages/Dashboard/DashboardUser/UserDashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-20">
      <h2 className="text-4xl font-bold text-red-600 text-center mb-6">
        Welcome, {user?.name || "User"}!
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-2xl mt-2 text-center">
        Role: {user?.role || "User"}
      </p>
    </div>
  );
};

export default UserDashboard;

