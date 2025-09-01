import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];

  const authLinks = [
    { name: "Login", path: "/auth/login" },
    { name: "Register", path: "/auth/register" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-600">
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
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-red-500"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {authLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-red-500"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "block text-red-600 font-semibold"
                  : "block text-gray-700 hover:text-red-500"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {authLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
