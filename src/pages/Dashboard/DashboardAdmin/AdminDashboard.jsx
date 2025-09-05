
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-20 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-red-700 dark:text-red-500">
          Welcome back, {user?.name || "Admin"}!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-2xl mt-2">
          Role: {user?.role || "Admin"}
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
