// // App.jsx (top-level)
// import { BrowserRouter, Routes, Route } from "react-router";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Home from "./pages/Home/Home";
// import Products from "./pages/Products/Products";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import Navbar from "./components/Navbar/Navbar";

// function App() {
//   return (
//     <BrowserRouter>
//       {/* Toast container ekbar e use korte hobe */}
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       <Navbar />
//       <div className="pt-16">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           {/* <Route path="/cart" element={<Cart />} /> */}
//           <Route path="/auth/login" element={<Login />} />
//           <Route path="/auth/register" element={<Register />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
