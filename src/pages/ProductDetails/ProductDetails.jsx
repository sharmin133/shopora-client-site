import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../app/api/productApi";
import { useDispatch, useSelector } from "react-redux";

import QuantitySelector from "./QuantitiySelector";
import RelatedProduct from "./RelatedProduct";
import { addToCart, toggleCart } from "../../features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery({ id });
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  if (isLoading)
    return <p className="text-center mt-10 text-black dark:text-white">Loading product...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">Failed to load product</p>
    );
  if (!product)
    return <p className="text-center mt-10 text-black dark:text-white">Product not found</p>;

  // Find if the product is already in the cart
  const currentCartItem = cartItems.find((item) => item.id === product._id);

  const handleAddToCart = () => {
    if (!currentCartItem) {
      dispatch(addToCart({ product, quantity }));
    } else {
      dispatch(toggleCart()); // Open cart modal
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <div className="flex flex-col md:flex-row gap-6 bg-red-50 dark:bg-red-900 shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        <img
          src={product.photos?.[0] || ""}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover"
        />
        
        {/* Product Info */}
        <div className="p-6 flex-1">
          {/* Product Name */}
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-black dark:text-white mb-4">{product.description}</p>

          {/* Price & Discount */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-black dark:text-white">
              ${product.price}
            </span>
            {product.discount > 0 && (
              <span className="text-red-600">-{product.discount}%</span>
            )}
          </div>

          {/* Stock Status */}
          <p
            className={`mb-4 font-medium ${
              product.stockStatus ? "text-black dark:text-white" : "text-red-600"
            }`}
          >
            {product.stockStatus ? "In Stock" : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.stockQuantity || 10}
          />

          {/* Add to Cart / View Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 font-medium rounded ${
              currentCartItem
                ? "bg-white hover:bg-red-400 border-2 border-red-700 text-red-700"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            disabled={!product.stockStatus || quantity === 0}
          >
            {currentCartItem ? "View Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Related Products</h3>
        <RelatedProduct category={product.category} currentId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetails;
