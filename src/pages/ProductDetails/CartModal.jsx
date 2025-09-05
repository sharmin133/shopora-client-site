import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, removeFromCart, closeCart } from "../../features/cartSlice";
import { useNavigate} from "react-router";
import { AuthContext } from "../../context/AuthContext";

const CartModal = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const { user } = useContext(AuthContext);

  if (!isCartOpen) return null;

  const handleQuantityChange = (id, delta, stock) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1 || newQty > stock) return;
    dispatch(changeQuantity({ id, quantity: newQty }));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const SHIPPING_CHARGE = 5;
  const grandTotal = totalPrice + (cartItems.length > 0 ? SHIPPING_CHARGE : 0);

  const handleCheckout = () => {
    dispatch(closeCart());
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/auth/login", { state: { from: "/checkout" } });
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-11/12 max-w-2xl shadow-2xl relative">
        <button
          onClick={() => dispatch(closeCart())}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center text-lg mt-4">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1, item.stockQuantity || 10)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1, item.stockQuantity || 10)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>

                <div className="font-semibold text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}

            <hr className="border-gray-300 dark:border-gray-700" />

            <div className="text-right space-y-1">
              <p className="text-gray-700 dark:text-gray-300">Subtotal: ${totalPrice.toFixed(2)}</p>
              <p className="text-gray-700 dark:text-gray-300">Shipping: ${SHIPPING_CHARGE.toFixed(2)}</p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">
                Grand Total: ${grandTotal.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-4 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
