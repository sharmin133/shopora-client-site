import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../features/cartSlice";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { user, logout } = useContext(AuthContext);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Add Product", path: "/add-product" },
  ];

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="bg-[#FF0000] fixed top-0 w-full z-50 shadow-md">
      <div className=" mx-auto  px-20  p-4 ">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">
            Shopora
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold underline"
                    : "text-white hover:underline"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={() => dispatch(toggleCart())}
              className="relative text-white hover:underline"
            >
              <FaShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold underline"
                      : "text-white hover:underline"
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/auth/login"
                  className="btn btn-sm btn-outline text-red-700 bg-white hover:bg-red-400 hover:text-red-600 w-full md:w-auto"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-red-600 w-full md:w-auto"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FF0000] px-4 pt-2 pb-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-white font-semibold underline"
                  : "block text-white hover:underline"
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={() => {
              dispatch(toggleCart());
              setMobileOpen(false);
            }}
            className="w-full text-white hover:underline text-left"
          >
            Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </button>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-white font-semibold underline"
                    : "block text-white hover:underline"
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="w-full btn btn-sm btn-outline text-red-700 bg-white hover:bg-red-400 hover:text-red-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                onClick={() => setMobileOpen(false)}
                className="w-full btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-red-600"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
