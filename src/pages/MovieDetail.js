import React, {useEffect, useState} from "react";
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = 'https://api.themoviedb.org/3';

const MovieDetail = () => {
    
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
              const response = await axios.get(`${BASIC_URL}/movie/${id}?api_key=${API_KEY}`);
              
              setMovie(response.data);
            } catch (error) {
              console.error('Error fetching movie detail:', error);
            }
          };
      
          fetchMovieDetail();
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
          </Box>
        );
      };
      
      export default MovieDetail;
