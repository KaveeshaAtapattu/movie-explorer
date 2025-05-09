import React, { useEffect, useState } from "react";
import MovieCard from '../components/MovieCard';
import { Grid, Typography, Button, Box, MenuItem, Select, Slider, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState([0, 10]);
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState('');

    // Load genres for the filter dropdown
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
                const data = await response.json();
                setGenres(data.genres || []);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };

        loadGenres();
    }, []);

    // Load filtered movies
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    page: currentPage,
                    ...(genre && { with_genres: genre }),
                    ...(year && { primary_release_year: year }),
                    ...(query && { query }),
                    'vote_average.gte': rating[0],
                    'vote_average.lte': rating[1],
                });

                const endpoint = query
                    ? `https://api.themoviedb.org/3/search/movie?${queryParams}`
                    : `https://api.themoviedb.org/3/discover/movie?${queryParams}`;

                const response = await fetch(endpoint);
                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [currentPage, genre, year, rating, query]);

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) =>
            direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
        );
    };
// Filters added
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Trending Movies</Typography> 


            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}> 
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Select
                    value={genre}
                    onChange={(e) => {
                        setCurrentPage(1);
                        setGenre(e.target.value);
                    }}
                    displayEmpty
                    sx={{ width: '200px' }}
                >
                    <MenuItem value="">All Genres</MenuItem>
                    {genres.map((g) => (
                        <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                    ))}
                </Select>

                <Select
                    value={year}
                    onChange={(e) => {
                        setCurrentPage(1);
                        setYear(e.target.value);
                    }}
                    displayEmpty
                    sx={{ width: '150px' }}
                >
                    <MenuItem value="">All Years</MenuItem>
                    {[...Array(30)].map((_, i) => {
                        const y = new Date().getFullYear() - i;
                        return <MenuItem key={y} value={y}>{y}</MenuItem>;
                    })}
                </Select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Search Movies"
                    variant="outlined"
                    size="small"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setCurrentPage(1);
                        console.log("Search query:", query);
                    }}
                >
                    Search
                </Button>
                
            </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        IMDb Rating
                    </Typography>
                    <Slider
                        value={rating}
                        onChange={(e, newValue) => {
                            setCurrentPage(1);
                            setRating(newValue);
                        }}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}/10`}
                        min={0}
                        max={10}
                        step={0.1}
                        sx={{ width: 250 }}
                    />
                </Box>
            </Box>

            
            {loading ? (
                <Typography variant="h6">Loading...</Typography>
            ) : (
                <Grid container spacing={2}>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <MovieCard movie={movie} />
                                </Link>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No movies found for the selected filters.</Typography>
                    )}
                </Grid>
            )}

            {!loading && movies.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                    <Button
                        variant="contained"
                        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    >
                        Load More
                    </Button>
                </Box>
            )}
        </div>
    );
}
