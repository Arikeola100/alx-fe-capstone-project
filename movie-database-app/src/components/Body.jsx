import React from 'react'

const Body = () => {
  return (
    <div className="container mx-auto p-4">
  <h2 className="text-3xl font-bold mb-6">Trending Movies</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {/* trending movies data */}
    {trendingMovies.map((movie) => (
      <div
        key={movie.id}
        className="relative bg-white rounded shadow-md overflow-hidden transition-transform transform hover:scale-105"
        style={{
          backgroundImage: `url(${movie.poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-50 p-4 h-full flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
          <p className="text-gray-300">Release Date: {movie.releaseDate}</p>
          <Link to={`/movie/${movie.id}`} className="text-blue-400 underline">
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Body