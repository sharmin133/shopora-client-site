import React, { useState, useContext } from "react";
import { useParams } from "react-router"; 
import { useGetProductByIdQuery } from "../../app/api/productApi";
import { CartContext } from "../../context/CartContext";
import QuantitySelector from "./QuantitiySelector";
import RelatedProduct from "./RelatedProduct";



const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery({ id });
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, setIsCartOpen } = useContext(CartContext);

  if (isLoading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load product</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  // ✅ শুধু এই প্রোডাক্টের cart আইটেম filter করে বের করা হলো
  const currentCartItem = cartItems.find((item) => item.id === product._id);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <img
          src={product.photos && product.photos.length > 0 ? product.photos[0] : ""}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover"
        />
        <div className="p-6 flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {product.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price}
            </span>
            {product.discount > 0 && (
              <span className="text-red-500">-{product.discount}%</span>
            )}
          </div>

          <p
            className={`mb-4 font-medium ${
              product.stockStatus ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stockStatus ? "In Stock" : "Out of Stock"}
          </p>

          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.stockQuantity || 10}
          />

          <button
            onClick={() =>
              currentCartItem ? setIsCartOpen(true) : addToCart(product, quantity)
            }
            className={`w-full py-3 font-medium rounded ${
              currentCartItem
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={!product.stockStatus || quantity === 0}
          >
            {currentCartItem ? "View Cart" : "Add to Cart"}
          </button>

          
        </div>
      </div>

        {/* Related Products Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Related Products</h3>
        <RelatedProduct category={product.category} currentId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetails;
