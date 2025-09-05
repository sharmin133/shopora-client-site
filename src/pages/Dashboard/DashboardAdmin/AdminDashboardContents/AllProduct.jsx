import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useGetProductsQuery } from "../../../../app/api/productApi";

const AllProduct = () => {
  const { user } = useContext(AuthContext);
  const { data, error, isLoading } = useGetProductsQuery(user?.token);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading)
    return (
      <p className="text-center mt-10 text-black dark:text-white">
        Loading products...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load products
      </p>
    );
  if (!data || data.length === 0)
    return (
      <p className="text-center mt-10 text-black dark:text-white text-lg">
        No products found.
      </p>
    );

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        All Products
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
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

          {/* Table Body */}
          <tbody className="bg-white dark:bg-black">
            {paginatedProducts.map((product, index) => (
              <tr key={product._id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2 text-black dark:text-white">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">{product.name}</td>
                <td className="px-4 py-2 text-black dark:text-white">${product.price}</td>
                <td className="px-4 py-2 text-red-600 dark:text-red-400">
                  {product.discount > 0 ? `-${product.discount}%` : "-"}
                </td>
                <td
                  className={`px-4 py-2 font-medium ${
                    product.stockStatus ? "text-black dark:text-white" : "text-red-600 dark:text-red-400"
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

export default AllProduct;
