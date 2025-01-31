




import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pdflogo from "../images/PDFIFY LOGO.png"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);  // For the mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false);  // For the dropdown menu

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-300 p-1 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="">
           <Link to="/">
            <img src={Pdflogo} alt="PDFify" width={150} height={40} loading="lazy" className="" />
          </Link>
{/*           <Link to="/" className="text-pink-600">PDF</Link>
          <Link to="/" className="text-white">ify</Link> */}
        </div>

        {/* Menu (Desktop and Mobile) */}
        <div className="hidden md:flex space-x-6 text-white font-semibold">
          <Link to="/">Home</Link>
<Link to="/compress">Compress PDF</Link>
          {/* Tool Link with Dropdown for Desktop */}
          <div className="relative">
            <button onClick={toggleDropdown} className="text-white font-semibold">
             PDF Tools
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                <Link to="/merge" className="block px-4 py-2 hover:bg-pure-greys-50 rounded-md mt-2 mx-2">Merge PDF</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-pure-greys-50 rounded-md mt-2 mx-2">JPG to PDF</Link>
                
                <Link to="/" className="block px-4 py-2 hover:bg-pure-greys-50 rounded-md mb-2 mx-2">Other Tool</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="font-semibold">About</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
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

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} flex flex-col text-white py-4 text-center`}>
        <Link to="/" className="text-white font-semibold hover:text-pure-greys-900 space-y-2">Home</Link>
<Link to="/compress"  className="text-white font-semibold hover:text-pure-greys-900 space-y-2 mt-2">Compress PDF</Link>
        {/* Tool Link with Dropdown for Mobile */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white hover:text-pure-greys-900 font-semibold mt-2"
          >
            Tools
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
              <Link to="/merge" className="block px-4 py-2 hover:bg-pure-greys-50 rounded-md mt-2 mx-2">Merge PDF</Link>
              <Link to="/" className="block px-4 py-2 hover:bg-pure-greys-50 rounded-md mt-2 mx-2">JPG to PDF</Link>
              
              <Link to="/" className="block px-4 py-2 hover:bg-pure-greys-50 rounded-md mb-2 mx-2">Other Tool</Link>
            </div>
          )}
        </div>

        <Link to="/about" className="text-white font-semibold hover:text-pure-greys-900 space-y-2 mt-2">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
