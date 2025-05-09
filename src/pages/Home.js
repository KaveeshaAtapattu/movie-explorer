import React, { useEffect, useState } from "react";
import MovieCard from '../components/MovieCard';
import { Grid, Typography, Button, Box, MenuItem, Select, Slider } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState([0, 10]);
    const [genres, setGenres] = useState([]);

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
                const query = new URLSearchParams({
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    page: currentPage,
                    ...(genre && { with_genres: genre }),
                    ...(year && { primary_release_year: year }),
                    'vote_average.gte': rating[0],
                    'vote_average.lte': rating[1],
                });

                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?${query}`);
                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [currentPage, genre, year, rating]);

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) =>
            direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Trending Movies</Typography>

            {/* Filters */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
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
                    sx={{ width: 200 }}
                />
            </Box>

            {/* Movie Grid */}
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

            {/* Pagination */}
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
