import React from "react";
import { useGetProductsQuery } from "../../app/api/productApi";
import { Link } from "react-router";

const RelatedProduct = ({ category, currentId }) => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading)
    return <p className="text-center mt-4 text-black dark:text-white">Loading related products...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-600">Failed to load related products.</p>;

  // Filter products by same category but exclude current product
  const related = products?.filter(
    (p) => p.category === category && p._id !== currentId
  )?.slice(0, 3); // ✅ show only 3 products

  if (!related || related.length === 0) {
    return <p className="text-center text-black dark:text-white mt-4">No related products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {related.map((item) => (
        <div
          key={item._id}
          className="bg-red-50 dark:bg-red-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
        >
          {/* Product Image */}
          {item.photos && item.photos.length > 0 ? (
            <img
              src={item.photos[0]}
              alt={item.name}
              className="h-40 w-full object-cover mb-2"
            />
          ) : (
            <div className="h-40 w-full bg-red-100 dark:bg-red-800 flex items-center justify-center text-black dark:text-white mb-2">
              No Image
            </div>
          )}

          {/* Product Info */}
          <div className="p-4">
            <h4 className="font-medium text-black dark:text-white mb-2">{item.name}</h4>
            <p className="text-black dark:text-white font-bold mb-4">${item.price}</p>

            {/* View Details Button */}
            <Link
              to={`/products/${item._id}`}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProduct;
