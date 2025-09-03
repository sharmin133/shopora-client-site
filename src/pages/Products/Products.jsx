import React, { useContext } from "react";
import { useGetProductsQuery } from "../../app/api/productApi";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const Products = () => {
  const { user } = useContext(AuthContext);

  // token দিয়ে products ফেচ করা
  const { data, error, isLoading } = useGetProductsQuery(user?.token);

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load products
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Products
      </h2>

      {data?.length === 0 && (
        <p className="text-gray-500 text-lg">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* Product Image */}
            {product.photos && product.photos.length > 0 ? (
              <img
                src={product.photos[0]}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>

              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${product.price}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-red-500">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <p
                className={`text-sm font-medium mb-4 ${
                  product.stockStatus
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {product.stockStatus ? "In Stock" : "Out of Stock"}
              </p>

              {/* Details Button */}
              <Link
                to={`/products/${product._id}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
