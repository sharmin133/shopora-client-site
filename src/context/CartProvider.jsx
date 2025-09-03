import React, { useState } from "react";
import { CartContext } from "./CartContext";
import CartModal from "../pages/ProductDetails/CartModal";


const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stockQuantity || 10
                ),
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity,
            stock: product.stockQuantity || 10,
          },
        ];
      }
    });
    //  setIsCartOpen(true);
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, quantity) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      )
    );

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </CartContext.Provider>
  );
};

export default CartProvider;
