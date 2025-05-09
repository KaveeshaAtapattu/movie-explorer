import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import MovieDetail from './pages/MovieDetail';
import { FavoritesProvider } from './context/FavoritesContext'; // Import the provider
import Navbar from "./components/Navbar";  
import SearchPage from "./pages/SearchPage";  
import './App.css';


const App = () => {
    return (
    <FavoritesProvider>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
     </FavoritesProvider>
    );
  }

export default App;
