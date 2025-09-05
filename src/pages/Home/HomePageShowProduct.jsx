import React, { useContext, useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css"; // import AOS styles
import { AuthContext } from "../../context/AuthContext";
import { useGetProductsQuery } from "../../app/api/productApi";

const HomePageShowProduct = () => {
  const { user } = useContext(AuthContext);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Fetch top products using token
  const { data: products, error, isLoading } = useGetProductsQuery(user?.token);

  if (isLoading)
    return <p className="text-center mt-10 text-black dark:text-white">Loading products...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load products
      </p>
    );

  // Show only top 6 products
  const topProducts = products?.slice(0, 6) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-black dark:text-white" data-aos="fade-up">
        Our Collection
      </h2>

      {/* No products message */}
      {topProducts.length === 0 && (
        <p className="text-center text-black dark:text-white text-lg" data-aos="fade-up">
          No products found.
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topProducts.map((product, index) => (
          <div
            key={product._id}
            className="bg-red-50 dark:bg-red-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay={index * 100} // stagger animation
          >
            {/* Product Image */}
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

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {product.name}
              </h3>

              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-black dark:text-white">
                  ${product.price}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-white">-{product.discount}%</span>
                )}
              </div>

             

              <Link
                to={`/products/${product._id}`}
                className="block w-full text-center bg-white hover:bg-red-400 text-red-600 font-medium py-2 rounded transition"
                data-aos="zoom-in"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center mt-8">
        <Link
          to="/products"
          className="px-6 py-2 bg-white text-black rounded-lg border-2 border-red-600 hover:bg-red-700 hover:text-white transition"
          data-aos="fade-up"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default HomePageShowProduct;
