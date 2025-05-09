import React, {useState}from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import MovieDetail from './pages/MovieDetail';
import { FavoritesProvider } from './context/FavoritesContext'; 
import Navbar from "./components/Navbar";  
import SearchPage from "./pages/SearchPage";  
import './App.css';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";



const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // switch between dark and light modes
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // theme object
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", 
    },
  });

    return (
    <FavoritesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar toggleTheme={toggleTheme} />  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
     </FavoritesProvider>
    );
  }

export default App;
