import React, { useContext } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoritesContext from '../context/FavoritesContext'; 

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); 

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        
        <Typography variant="body1">No favorites added yet.</Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Box sx={{ textAlign: "center" }}>
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                  <Typography variant="subtitle2">{movie.title}</Typography>
                </Link>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => toggleFavorite(movie)}
                >
                  Remove from Favorites

                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
