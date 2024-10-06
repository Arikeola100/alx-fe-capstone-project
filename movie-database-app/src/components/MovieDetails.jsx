import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "f764c18a";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
        if (response.data.Response === "True") {
          setMovie(response.data);
          setError("");
        } else {
          setError(response.data.Error || "Movie details not found.");
        }
      } catch (err) {
        if (err.response) {
          setError("Error fetching movie details. Please try again later.");
        } else if (err.request) {
          setError("Network error. Please check your connection.");
        } else {
          setError("An unknown error occurred. Please try again.");
        }
      }
    };
  
    fetchMovieDetails();
  }, [id]);
  
  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {movie ? (
        <div className="bg-white p-6 rounded shadow-md">
          <div className="flex flex-col md:flex-row">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              className="w-full md:w-1/3 mb-4 md:mb-0"
            />
            <div className="md:ml-6">
              <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
              <p className="text-lg mb-2"><strong>Plot:</strong> {movie.Plot}</p>
              <p className="text-lg mb-2"><strong>Genre:</strong> {movie.Genre}</p>
              <p className="text-lg mb-2"><strong>Director:</strong> {movie.Director}</p>
              <p className="text-lg mb-2"><strong>Cast:</strong> {movie.Actors}</p>
              <p className="text-lg mb-2"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
              <p className="text-lg mb-2"><strong>Release Date:</strong> {movie.Released}</p>
            </div>
          </div>
          <Link to="/" className="text-blue-500 mt-4 inline-block">Back to Search</Link>
        </div>
      ) : (
        <p className="text-center">Loading movie details...</p>
      )}
    </div>
  );
}

export default MovieDetails;
