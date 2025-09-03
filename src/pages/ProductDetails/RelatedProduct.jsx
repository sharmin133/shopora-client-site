import React from "react";
import { useGetProductsQuery } from "../../app/api/productApi";
import { Link } from "react-router";

const RelatedProduct = ({ category, currentId }) => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading related products...</p>;
  if (error) return <p>Failed to load related products.</p>;

  const related = products?.filter(
    (p) => p.category === category && p._id !== currentId
  );

  if (!related || related.length === 0) {
    return <p>No related products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {related.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-4 hover:shadow-md transition"
        >
          <img
            src={item.photos[0]}
            alt={item.name}
            className="h-40 w-full object-cover mb-2"
          />
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-blue-600 font-bold">${item.price}</p>

          {/* Details Button */}
          <Link
            to={`/products/${item._id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RelatedProduct;
