import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
          Nutrition Score
        </span>

        {/* Menu hamburger pour les petits écrans */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-blue-500 focus:outline-none"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links de la navbar */}
        <div className={`md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
            <li>
              <Link
                to="/"
                className="text-xl block py-2 px-3 text-white rounded relative overflow-hidden group"
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/calculator"
                className="text-xl block py-2 px-3 text-white rounded relative overflow-hidden group"
              >
                Calculator
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="text-xl block py-2 px-3 text-white rounded relative overflow-hidden group"
              >
                Pricing
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-xl block py-2 px-3 text-white rounded relative overflow-hidden group"
              >
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
