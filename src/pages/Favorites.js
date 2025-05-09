import React, { useContext } from 'react';
import { Grid, Box, Typography, Button, Card, CardMedia, CardContent, CardActions, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FavoritesContext from '../context/FavoritesContext'; 

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); 
  const navigate = useNavigate();
  const theme = useTheme();


  return (
    <Box sx={{ padding: "2rem", backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{
          mb: 3,
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: '#fff'
          }
        }}
      >
        ⬅ Back to Home
      </Button>

      <Typography variant="h4" gutterBottom color="primary">
        Your Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          You haven't added any favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}
              >
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => toggleFavorite(movie)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;