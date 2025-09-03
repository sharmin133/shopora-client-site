import React, { useContext } from "react";
import { Link, NavLink } from "react-router"; // ✅ react-router-dom
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Add Product", path: "/add-product" },
  ];

  return (
    <div className="navbar bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-red-600">
          Shopora
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:text-red-500"
            }
          >
            {link.name}
          </NavLink>
        ))}

        {/* Cart Icon */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative text-gray-700 hover:text-red-500"
        >
          <FaShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        {user && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:text-red-500"
            }
          >
            Dashboard
          </NavLink>
        )}

        {user ? (
          <button
            onClick={logout}
            className="btn btn-sm btn-outline btn-error"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="btn btn-sm btn-outline btn-success"
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/register"
              className="btn btn-sm btn-outline btn-primary"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

