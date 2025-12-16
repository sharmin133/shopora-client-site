import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const initialState = {
  items: getCartFromLocalStorage(), 
  isCartOpen: false, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.product._id);
      if (!existing) {
        state.items.push({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          stockQuantity: item.product.stockQuantity || 10,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // Change quantity of a cart item
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // Toggle cart visibility
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    // Close cart
    closeCart: (state) => {
      state.isCartOpen = false;
    },

    // Clear all items from cart
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, toggleCart, closeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
