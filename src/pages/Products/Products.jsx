import React, { useContext, useState } from "react";
import { useGetProductsQuery } from "../../app/api/productApi";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const Products = () => {
  const { user } = useContext(AuthContext);
  const { data, error, isLoading } = useGetProductsQuery(user?.token);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  if (isLoading)
    return <p className="text-center mt-10 text-black dark:text-white">Loading products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Failed to load products</p>;
  if (!data || data.length === 0)
    return <p className="text-center text-black dark:text-white text-lg mt-10">No products found.</p>;

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / productsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <h2 className="md:text-5xl text-3xl font-bold my-6 text-black text-center dark:text-white">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-red-50 dark:bg-red-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {product.photos && product.photos.length > 0 ? (
              <img
                src={product.photos[0]}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-red-100 dark:bg-red-800 flex items-center justify-center text-black dark:text-white">
                No Image
              </div>
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{product.name}</h3>

              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-black dark:text-white">${product.price}</span>
                {product.discount > 0 && (
                  <span className="text-sm text-white">-{product.discount}%</span>
                )}
              </div>


              <Link
                to={`/products/${product._id}`}
                className="block w-full text-center bg-white hover:bg-red-400 text-red-600 font-medium py-2 rounded transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="text-black dark:text-white font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
