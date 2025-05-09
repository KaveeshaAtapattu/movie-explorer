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
      
        if (!movie) return <div>Loading...</div>;
      
        return (
          <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
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
    </Container>
        );
      };
      
      export default MovieDetail;
