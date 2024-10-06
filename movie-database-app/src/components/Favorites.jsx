import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load and clean favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Filter out invalid movies (e.g., missing imdbID)
    const validFavorites = storedFavorites.filter(movie => movie.imdbID);

    // Update state and localStorage if any invalid movies were removed
    if (validFavorites.length !== storedFavorites.length) {
      localStorage.setItem("favorites", JSON.stringify(validFavorites));
    }

    setFavorites(validFavorites);
  }, []);

  // Optionally add a clear button to remove all favorites
  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]); // Clear the state as well
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Your Favorite Movies</h1>

      {/* Show message if no favorites */}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorite movies yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div key={movie.imdbID} className="bg-white p-4 rounded shadow-md">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                  alt={movie.Title}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{movie.Title}</h2>
                </div>
                <p className="text-gray-600">Release Date: {movie.Year}</p>
                <Link to={`/movie/${movie.imdbID}`} className="text-blue-500">
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Clear Favorites Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={clearFavorites}
              className="p-2 bg-red-500 text-white rounded"
            >
              Clear All Favorites
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
