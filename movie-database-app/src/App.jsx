import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList"; // Movie list component (with search)
import MovieDetails from "./components/MovieDetails"; // Detailed view component
import Favorites from "./components/Favorites"; // Favorites component
import Navbar from "./components/Navbar"; // Navbar component
import Footer from "./components/Footer"; // Footer component
import Homepage from './components/Homepage'; // Homepage component
import About from './components/About';// About component


function App() {
  return (
    <div className="max-h-screen bg-gradient-to-r from-blue-500 blue-600 via-purple-500 to-gray-500">
      <Router>
        <Navbar /> {/* Navbar at the top */}
        
        <Routes>
          {/* Home route would contain both MovieList and Homepage */}
          <Route 
            path="/" 
            element={
              <>
                <MovieList /> {/* This contains the search bar */}
                <Homepage />  {/* This display trending/latest movies here */}
              </>
            } 
          />
          <Route path="/movie/:id" element={<MovieDetails />} />{/* Movie details Route */}
          <Route path='/favorites' element={<Favorites />} /> {/* Favorites Route */}
          <Route path='/homepage' element={<Homepage />} /> {/* Homepage Route */}
          <Route path='/about' element={<About />} />  {/* About Route */}
        </Routes>

        <Footer /> {/* Footer at the bottom */}
      </Router>
    </div>
  );
}

export default App;
