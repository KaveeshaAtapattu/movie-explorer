import React, {useEffect, useState} from "react";
import { fetchTrendingMovies } from '../api';
import MovieCard from '../components/MovieCard';
import { Grid, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";


export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadTrending = async () => {
        setLoading(true);
        const data = await fetchTrendingMovies(currentPage);
        if (data && data.results) { // new: Check if data and results exist before updating state
            console.log('Trending Movies Response:', data);
            setMovies(data.results); 
        }
        setLoading(false); 
        };
      
        loadTrending(); 
    }, [currentPage]);

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
        if (direction === "next") {
            return prevPage + 1;
        } else if (direction === "prev" && prevPage > 1) {
            return prevPage - 1;
        }
            return prevPage;
        });
    };
      

    return (
        <div style = {{padding: '20px'}}>
            <Typography variant="h4" gutterBottom>Trending Movies</Typography>
           
            {loading ? (
                <Typography variant="h6">Loading...</Typography>
        ) : (
            <Grid container spacing={2}>
                {console.log("Rendering movies:", movies)}

                {movies.length > 0 ? (
                    movies.map(movie => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                            <MovieCard movie={movie} />
                        </Link>
                        </Grid>
                    ))
                    ) : (
                    <Typography>No trending movies available.</Typography>
                )}
                </Grid>
            )}


            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <Button
                    variant="outlined"
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1} 
                >
                    Previous
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handlePageChange("next")}
                    sx={{ marginLeft: "1rem" }}
                >
                    Next
                </Button>
            </Box>


        </div>

        );
    }

