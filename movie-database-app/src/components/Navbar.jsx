import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon

function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Function to toggle the search bar visibility
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 rounded-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Home link */}
        <Link to="/" className="text-xl font-bold">AMDB</Link>

        {/* Navbar Links */}
        <ul className="flex space-x-6 absolute top-12 right-36">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/homepage" className="hover:text-blue-400">Trending</Link></li>
          <li><Link to="/favorites" className="hover:text-blue-400">Favorites</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
        </ul>

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
