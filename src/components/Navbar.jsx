import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/src/assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-off-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="Angshuk Logo" className="h-16 w-auto" />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
            >
              Order
            </NavLink>
            <NavLink
              to="/fabrics"
              className={({ isActive }) =>
                `text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
            >
              Fabrics
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/order"
              className="gradient-button inline-block font-semibold"
            >
              Order Now
            </NavLink>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-deep-charcoal hover:text-soft-teal focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-off-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `block px-3 py-2 text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Order
            </NavLink>
            <NavLink
              to="/fabrics"
              className={({ isActive }) =>
                `block px-3 py-2 text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Fabrics
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-3 py-2 text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 text-deep-charcoal hover:text-soft-teal transition-colors ${
                  isActive ? 'border-b-2 border-soft-teal font-semibold' : ''
                }`
              }
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            <NavLink
              to="/order"
              className="block px-3 py-2 gradient-button font-semibold"
              onClick={toggleMenu}
            >
              Order Now
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;