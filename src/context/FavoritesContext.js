import React, {createContext, useState, useEffect} from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children}) => {
  // hold the list of favorite movies
    const [favorites, setFavorites] = useState([]);

    // check if there are any saved favorites in local storage 
    useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    }, []);

    const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some(fav => fav.id === movie.id)
      ? favorites.filter(fav => fav.id !== movie.id) // remove the movie from favorites
      : [...favorites, movie]; // add the movie to favorites

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };


return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

