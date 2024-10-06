import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

function MovieList() {
  // State variables for search query, movies, errors, loading status, favorites, and pagination
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [sortCriteria, setSortCriteria] = useState("title"); // State for sorting criteria

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;


  // useEffect to load saved favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Function to handle adding/removing a movie from favorites
  const handleFavorite = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Check if the movie is already in favorites
    const isFavorited = storedFavorites.some((favMovie) => favMovie.imdbID === movie.imdbID);
    
    if (isFavorited) {
      // If already favorited, remove it from favorites
      const updatedFavorites = storedFavorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    } else {
      // If not favorited, add to favorites
      const updatedFavorites = [...storedFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    }
    
    // Update the state to reflect the changes
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  };

  // Function to fetch movies based on search query and page number
  const fetchMovies = async (page = 1) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError(""); // Clear any previous errors
      } else {
        setError(response.data.Error || "No movies found."); // Set error if no movies found
        setMovies([]); // Clear movies
      }
    } catch (err) {
      if (err.response) {
        setError("Error fetching data from the server. Please try again later.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    fetchMovies(1); // Fetch movies for the first page
  };

  // Handle pagination - go to next page
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(nextPage);
  };

  // Handle pagination - go to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchMovies(prevPage);
    }
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Sort movies based on selected criteria (title or release date)
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortCriteria === "title") {
      return a.Title.localeCompare(b.Title); // Sort alphabetically by title
    } else if (sortCriteria === "year") {
      return b.Year - a.Year; // Sort by release date (newest first)
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4 " >
      <h1 className="text-4xl font-bold text-left mb-6">
        Welcome! 
      </h1>
      <h1 className="text-4xl font-bold text-left mb-6">  Millions of movies and TV shows to discover. Explore now.
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex justify-center mb-6 w-full">
      <input
       type="text"
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search for a movie..."
       className="p-2 border border-gray-300 rounded-l-md w-full md:w-[2200px]" 
  />
  <button type="submit" className="p-2 bg-gray-800 text-white rounded-r-md">
    Search
  </button>
</form>


      {/* Sorting Options */}
      <div className="flex justify-center mb-6">
        <label htmlFor="sort" className="mr-2">Sort By:</label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="title">Title (A-Z)</option>
          <option value="year">Release Date (Newest First)</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color={"#000"} loading={loading} size={50} />
        </div>
      ) : (
        <>
          {/* Movies List */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedMovies.map((movie) => (
              <div 
                key={movie.imdbID} 
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{movie.Title}</h2>
                    {/* Favorite Button */}
                    <button onClick={() => handleFavorite(movie)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={favorites.some((fav) => fav.imdbID === movie.imdbID) ? "green" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.586l1.318-1.268a4.5 4.5 0 116.364 6.364L12 19.07l-7.682-7.318a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600">Release Date: {movie.Year}</p>
                  <Link to={`/movie/${movie.imdbID}`} className="text-blue-500">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1} 
              className={`mr-4 p-2 bg-gray-500 text-white rounded ${currentPage === 1 ? "opacity-50" : ""}`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="p-2 bg-gray-800 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieList;
