import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useGetAllUsersQuery } from "../../../../app/api/userApi";

const AllUser = () => {
  const { user } = useContext(AuthContext);
  const { data: users, isLoading, isError } = useGetAllUsersQuery(user?.token, {
    skip: !user?.token,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!user)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Please login to view users.
      </p>
    );
  if (isLoading)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Loading users...
      </p>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load users.
      </p>
    );
  if (!users || users.length === 0)
    return (
      <p className="text-center mt-10 text-black dark:text-white text-lg">
        No users found.
      </p>
    );

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        All Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-black">
            {paginatedUsers.map((u, index) => (
              <tr key={u._id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2 text-black dark:text-white">{startIndex + index + 1}</td>
                <td className="px-4 py-2 text-black dark:text-white">{u.name}</td>
                <td className="px-4 py-2 text-black dark:text-white">{u.email}</td>
                <td className="px-4 py-2 text-black dark:text-white">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-red-200 text-black dark:bg-red-800 dark:text-white hover:bg-red-300 dark:hover:bg-red-700"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUser;
