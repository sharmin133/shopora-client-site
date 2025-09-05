
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useGetMyProductsQuery } from "../../../../app/api/productApi";

const MyProduct = () => {
  const { user } = useContext(AuthContext);

  // Fetch logged-in user's products using their token
  const { data, isLoading, error } = useGetMyProductsQuery(user?.token);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // current active page
  const itemsPerPage = 6; // number of products per page

  // Handling loading, error and empty data states
  if (!user)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Please login to view your products.
      </p>
    );

  if (isLoading)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Loading your products...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load your products
      </p>
    );

  if (!data || data.length === 0)
    return (
      <p className="text-center mt-10 text-black dark:text-white text-lg">
        You have not added any products yet.
      </p>
    );

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage; // starting index for current page
  const paginatedProducts = data.slice(startIndex, startIndex + itemsPerPage); // products to show on current page

  // Function to handle page change when clicking Prev, Next or page numbers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        My Products
      </h2>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          {/* Table header */}
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Discount</th>
              <th className="px-4 py-2 text-left">Stock Status</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="bg-white dark:bg-black">
            {paginatedProducts.map((product, index) => (
              <tr key={product._id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2 text-black dark:text-white">
                  {/* Display product number relative to all products */}
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">{product.name}</td>
                <td className="px-4 py-2 text-black dark:text-white">${product.price}</td>
                <td className="px-4 py-2 text-red-600 dark:text-red-400">
                  {product.discount > 0 ? `-${product.discount}%` : "-"}
                </td>
                <td
                  className={`px-4 py-2 font-medium ${
                    product.stockStatus
                      ? "text-black dark:text-white"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {product.stockStatus ? "In Stock" : "Out of Stock"}
                </td>
                <td className="px-4 py-2 text-black dark:text-white line-clamp-2">
                  {product.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {/* Previous page button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page numbers */}
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

        {/* Next page button */}
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

export default MyProduct;
