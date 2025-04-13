import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust path as needed

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-off-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Angshuk Logo" className="h-16 w-auto object-contain mr-2" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-deep-charcoal hover:text-soft-teal px-3 py-2">
              Home
            </Link>
            <Link to="/order" className="text-deep-charcoal hover:text-soft-teal px-3 py-2">
              Order
            </Link>
            <Link to="/fabrics" className="text-deep-charcoal hover:text-soft-teal px-3 py-2">
              Fabrics
            </Link>
            <Link to="/about" className="text-deep-charcoal hover:text-soft-teal px-3 py-2">
              About
            </Link>
            <Link to="/contact" className="text-deep-charcoal hover:text-soft-teal px-3 py-2">
              Contact
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-deep-charcoal hover:text-soft-teal focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 pb-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-deep-charcoal hover:text-soft-teal px-3 py-2"
              >
                Home
              </Link>
              <Link
                to="/order"
                onClick={() => setIsOpen(false)}
                className="text-deep-charcoal hover:text-soft-teal px-3 py-2"
              >
                Order
              </Link>
              <Link
                to="/fabrics"
                onClick={() => setIsOpen(false)}
                className="text-deep-charcoal hover:text-soft-teal px-3 py-2"
              >
                Fabrics
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-deep-charcoal hover:text-soft-teal px-3 py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-deep-charcoal hover:text-soft-teal px-3 py-2"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
