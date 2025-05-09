import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import MovieDetail from './pages/MovieDetail';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import './App.css';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load user from localStorage 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <FavoritesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {user && (
            <Navbar user={user} onLogout={handleLogout} toggleTheme={toggleTheme} />
          )}
          <Routes>
            <Route
              path="/"
              element={user ? <Home user={user} /> : <Login onLogin={handleLogin} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
