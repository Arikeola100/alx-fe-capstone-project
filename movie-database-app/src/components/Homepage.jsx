import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiKey = import.meta.env.VITE_OMDB_API_KEY; // OMDb API key

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch trending/featured movies based on keyword
  const fetchTrendingMovies = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=marvel`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError(""); // Clear errors
      } else {
        setError("No movies found.");
      }
    } catch (err) {
      setError("Error fetching trending movies.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchTrendingMovies(); // Fetch movies when component loads
  }, []);

  return (
    <div className=" bg- bg-gray-800 container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Trending Movies</h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="bg-white p-4 rounded shadow-md">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{movie.Title}</h2>
              </div>
              <p className="text-gray-600">Release Year: {movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="text-blue-500">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Homepage;
