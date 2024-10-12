import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon

function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the hamburger menu

  // Function to toggle the search bar visibility
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Function to toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 rounded-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Home link */}
        <Link to="/" className="text-xl font-bold">AMDB</Link>

        {/* Hamburger Menu for mobile screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {/* Icon for hamburger menu */}
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
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for larger screens (hidden on mobile) */}
        <ul className={`hidden md:flex space-x-6`}>
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/homepage" className="hover:text-blue-400">Trending</Link></li>
          <li><Link to="/favorites" className="hover:text-blue-400">Favorites</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
        </ul>

        {/* Mobile dropdown menu (shown when the hamburger menu is clicked) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-4 mt-4">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/homepage" className="hover:text-blue-400">Trending</Link></li>
              <li><Link to="/favorites" className="hover:text-blue-400">Favorites</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            </ul>
          </div>
        )}

        {/* Search Icon */}
        <div className="relative">
          <button onClick={toggleSearchBar} className="text-white hover:text-blue-400">
            <FaSearch size={20} />
          </button>

          {/* Search Bar (shown/hidden based on isSearchVisible) */}
          {isSearchVisible && (
            <div className="absolute top-12 right-0 bg-white text-black p-2 rounded shadow-md z-50">
              <input
                type="text"
                placeholder="Search for a movie..."
                className="p-2 border border-gray-300 rounded w-64"
              />
              <button type="submit" className="p-2 bg-gray-800 text-white rounded-r-md">
                Search
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
