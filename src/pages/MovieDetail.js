import React, {useEffect, useState, useContext} from "react";
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Grid, Box, Typography, CircularProgress } from '@mui/material';
import FavoritesContext from '../context/FavoritesContext'; 

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = 'https://api.themoviedb.org/3';



const MovieDetail = () => {
    
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);


    

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
              const response = await axios.get(`${BASIC_URL}/movie/${id}?api_key=${API_KEY}`);
              
              setMovie(response.data);
              
            } catch (error) {
              console.error('Error fetching movie detail:', error);
            }
          };
      
        
        const fetchCast = async () => {
          try {
            const response = await axios.get(`${BASIC_URL}/movie/${id}/credits?api_key=${API_KEY}`);
            setCast(response.data.cast.slice(0, 5));
          } catch (error) {
            console.error('Error fetching Cast detail:', error);
          }
        };
        fetchMovieDetail();
        fetchCast();


        }, [id]);
      
        if (!movie) {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
              }}
            >
              <CircularProgress />
            </Box>
          );
        }

        const isFavorite = favorites.some(fav => fav.id === movie.id);

        return (
          <Box sx={{ padding: "2rem" }}>
            <Grid container spacing={4}>
              {/* Left column: poster */}
              <Grid item xs={12} md={4}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Grid>

              {/* Right column: details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  {movie.title}
                </Typography>

                <Button
                  variant={isFavorite ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => toggleFavorite(movie)}
                  sx={{ mb: 2 }}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>

                {/* Genre tags */}
                {movie.genres && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {movie.genres.map((genre) => (
                      <Box
                        key={genre.id}
                        sx={{
                          px: 2,
                          py: 0.5,
                          backgroundColor: "#1976d2",
                          color: "#fff",
                          borderRadius: "20px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {genre.name}
                      </Box>
                    ))}
                  </Box>
                )}

                <Typography variant="body1" gutterBottom>
                  <strong>Overview:</strong> {movie.overview}
                </Typography>
                <Typography variant="body2">
                  <strong>Release Date:</strong> {movie.release_date}
                </Typography>
                <Typography variant="body2">
                  <strong>Rating:</strong> {movie.vote_average}
                </Typography>
                
              </Grid>
            </Grid>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Top Cast
          </Typography>
          <Grid container spacing={2}>
            {cast.map((actor) => (
              <Grid item xs={6} md={2} key={actor.id}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={actor.name}
                    style={{ width: "100%", borderRadius: "8px", height: "auto" }}
                  />
                  <Typography variant="subtitle2">{actor.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    as {actor.character}
                  </Typography>
                </Box> 
              </Grid>
            ))}
          </Grid>
          </Box>
        );
      };
      
      export default MovieDetail;
