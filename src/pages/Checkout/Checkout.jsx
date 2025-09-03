// import React, { useState } from "react";

// const Checkout = ({ cartItems, user }) => {
//   const [shipping, setShipping] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod"); // cod = Cash on Delivery
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shippingPerUnit = 5;
//   const shippingCost = cartItems.reduce(
//     (total, item) => total + shippingPerUnit * item.quantity,
//     0
//   );
//   const total = subtotal + shippingCost;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShipping((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePlaceOrder = () => {
//     // এখানে তুমি backend POST call করতে পারো order create করার জন্য
//     // axios.post("/api/orders", { cartItems, shipping, paymentMethod })

//     setOrderPlaced(true);
//   };

//   if (cartItems.length === 0) {
//     return <p className="text-center mt-8">Your cart is empty.</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Checkout</h2>

//       {orderPlaced ? (
//         <div className="text-center p-6 bg-green-100 rounded">
//           <h3 className="text-xl font-bold mb-2">Order Placed Successfully!</h3>
//           <p>Thank you for your purchase.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Shipping Form */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-bold mb-4">Shipping Address</h3>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={shipping.name}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={shipping.email}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={shipping.address}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={shipping.city}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={shipping.postalCode}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={shipping.country}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-bold mb-4">Order Summary</h3>
//             <ul className="mb-4">
//               {cartItems.map((item) => (
//                 <li key={item.id} className="flex justify-between mb-2">
//                   <span>
//                     {item.name} x {item.quantity}
//                   </span>
//                   <span>${(item.price * item.quantity).toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>
//             <p className="flex justify-between font-medium">
//               <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
//             </p>
//             <p className="flex justify-between font-medium">
//               <span>Shipping:</span> <span>${shippingCost.toFixed(2)}</span>
//             </p>
//             <p className="flex justify-between font-bold mt-2">
//               <span>Total:</span> <span>${total.toFixed(2)}</span>
//             </p>

//             {/* Payment Options */}
//             <div className="mt-4">
//               <h4 className="font-semibold mb-2">Payment Method</h4>
//               <label className="block mb-1">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="cod"
//                   checked={paymentMethod === "cod"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="mr-2"
//                 />
//                 Cash on Delivery
//               </label>
//               <label className="block mb-1">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="stripe"
//                   checked={paymentMethod === "stripe"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="mr-2"
//                 />
//                 Stripe
//               </label>
//               <label className="block mb-1">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="paypal"
//                   checked={paymentMethod === "paypal"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="mr-2"
//                 />
//                 Paypal
//               </label>
//             </div>

//             <button
//               onClick={handlePlaceOrder}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
import React from 'react';

const Checkout = () => {
    return (
        <div>
            
        </div>
    );
};

export default Checkout;