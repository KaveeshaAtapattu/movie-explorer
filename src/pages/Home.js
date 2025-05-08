import React, {useEffect, useState} from "react";
import { fetchTrendingMovies } from '../api';
import MovieCard from '../components/MovieCard';
import { Grid, Typography } from "@mui/material";


export default function Home() {
    const[movies, setMovies] = useState([]);

    useEffect(() => {
        const loadTrending = async () => {
          const data = await fetchTrendingMovies(); 
          console.log('Trending Movies Response:', data); 
          setMovies(data); 
        };
      
        loadTrending(); 
      }, []);
      

    return (
        <div style = {{padding: '20px'}}>
            <Typography variant="h4" gutterBottom>Trending Movies</Typography>
            <Grid container spacing={2}>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <Grid item key ={movie.id}>
                            <MovieCard movie={movie}/>
                        </Grid>
                    ))
                    ) : (
                    <Typography>No trending movies available.</Typography>
                )}
                </Grid>
            </div>

        );
    }

