import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useGetMyOrdersQuery } from "../../../../app/api/orderApi";

const MyOrder = () => {
  const { user } = useContext(AuthContext);

  // Fetch user's orders
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery(user?.token, {
    skip: !user?.token,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  if (!user)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Please login to view your orders.
      </p>
    );

  if (isLoading)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Loading your orders...
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load your orders
      </p>
    );

  if (!orders || orders.length === 0)
    return (
      <p className="text-center mt-10 text-black dark:text-white text-lg">
        You have no orders yet.
      </p>
    );

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    const dateMatch =
      !dateFilter ||
      new Date(order.createdAt).toISOString().slice(0, 10) === dateFilter;
    return statusMatch && dateMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        My Orders
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded bg-gray-500"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Shipping</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-black">
            {paginatedOrders.map((order, index) => (
              <tr
                key={order._id}
                className="border-b border-gray-300 dark:border-gray-700"
              >
                <td className="px-4 py-2 text-black dark:text-white">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">{order._id}</td>
                <td className="px-4 py-2 text-black dark:text-white">{order.status}</td>
                <td className="px-4 py-2 text-black dark:text-white">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">
                  {order.cartItems.map((item) => (
                    <div key={item.id}>
                      {item.name} x {item.quantity} ($
                      {(item.price * item.quantity).toFixed(2)})
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">
                  {order.shipping.address}, {order.shipping.city},{" "}
                  {order.shipping.postalCode}, {order.shipping.country}
                </td>
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

export default MyOrder;
