import React from "react";

// CartModal component receives cart state and control functions as props
const CartModal = ({ isOpen, onClose, cartItems, setCartItems }) => {
  // If modal is not open, render nothing
  if (!isOpen) return null;

  // Function to change quantity of a cart item
  const handleQuantityChange = (id, delta, stock) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              // Ensure quantity stays between 1 and stock limit
              quantity: Math.min(Math.max(item.quantity + delta, 1), stock),
            }
          : item
      )
    );
  };

  // Calculate subtotal (sum of item price * quantity)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping cost per item
  const shippingPerUnit = 5;

  // Calculate total shipping
  const shipping = cartItems.reduce(
    (total, item) => total + shippingPerUnit * item.quantity,
    0
  );

  // Grand total = subtotal + shipping
  const grandTotal = subtotal + shipping;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ✕
        </button>

        {/* Modal title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Shopping Cart
        </h2>

        {/* If cart is empty */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Cart is empty</p>
        ) : (
          // If cart has items
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2 text-gray-900 dark:text-white"
              >
                {/* Item name */}
                <span>{item.name}</span>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1, item.stock)}
                    disabled={item.quantity <= 1} // cannot go below 1
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1, item.stock)}
                    disabled={item.quantity >= item.stock} // cannot exceed stock
                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Item total price */}
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            {/* Divider */}
            <hr className="my-2 border-gray-300 dark:border-gray-600" />

            {/* Subtotal, Shipping, Grand Total */}
            <p className="flex justify-between font-medium text-gray-900 dark:text-white">
              <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-medium text-gray-900 dark:text-white">
              <span>Shipping:</span> <span>${shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-gray-900 dark:text-white">
              <span>Grand Total:</span> <span>${grandTotal.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;

