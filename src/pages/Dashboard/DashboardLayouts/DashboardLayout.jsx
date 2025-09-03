// src/pages/Dashboard/DashboardLayouts/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DashboardLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const role = user?.role;

  return (
    <div className="min-h-screen bg-red-100 md:flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-red-100 p-4 z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-2xl font-bold text-center mb-6 block hover:text-red-800 ${
              isActive
                ? "bg-red-500 text-white"
                : "text-red-700 hover:bg-red-200"
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          Dashboard
        </NavLink>

        <nav className="flex flex-col space-y-2">
          {/* Home link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded font-bold ${
                isActive ? "bg-red-500 text-white" : "text-red-700 hover:bg-red-200"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </NavLink>

          {/* Admin links */}
          {role === "admin" && (
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `px-3 py-2 rounded font-bold ${
                  isActive ? "bg-red-500 text-white" : "text-red-700 hover:bg-red-200"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              All Users
            </NavLink>
          )}

          {/* User links */}
          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/create-donation-request"
                className={({ isActive }) =>
                  `px-3 py-2 rounded font-bold ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Create Donor Request
              </NavLink>
              <NavLink
                to="/dashboard/my-requests"
                className={({ isActive }) =>
                  `px-3 py-2 rounded font-bold ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                My Requests
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 text-black dark:text-white p-4">
        {/* Mobile menu button */}
        <button
          className="md:hidden mb-4 p-2 rounded bg-red-100 text-red-600 shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
