import React, { useEffect, useState } from "react";
import MovieCard from '../components/MovieCard';
import { Grid, Typography, Button, Box, MenuItem, Select, Slider, TextField, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // show loading state
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState(''); // select genre
    const [year, setYear] = useState(''); // select year
    const [rating, setRating] = useState([0, 10]); // select rating
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState(''); // search query

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

    
return (
  <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
    <Typography variant="h3" fontWeight="bold" gutterBottom align="center" color="primary">
    Explore Movies
    </Typography>
    <Paper elevation={4} sx={{ p: 3, mb: 5, borderRadius: 5 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
      {/* Genre and Year Selects */}
      <Box display="flex" gap={2} flexWrap="wrap">
      <Select
        value={genre}
        onChange={(e) => {
        setCurrentPage(1);
        setGenre(e.target.value);
        }}
        displayEmpty
        variant="outlined"
        sx={{ minWidth: 150 }}
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
        variant="outlined"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Years</MenuItem>
        {[...Array(30)].map((_, i) => {
        const y = new Date().getFullYear() - i;
        return <MenuItem key={y} value={y}>{y}</MenuItem>;
        })}
      </Select>
      </Box>

      {/* Search Bar  */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 200 }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      </Box>

      {/* IMDb Rating */}
      <Box sx={{ width: 300 }}>
      <Typography gutterBottom>IMDb Rating</Typography>
      
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
        step={0.5}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">{rating[0]}</Typography>
        <Typography variant="body2">{rating[1]}</Typography>
      </Box>
      </Box>
    </Box>
    </Paper>

    {loading ? (
    <Typography variant="h6" align="center">Loading...</Typography>
    ) : (
    <Grid container spacing={3}>
      {movies.length > 0 ? (
      movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
          <MovieCard movie={movie} />
        </Link>
        </Grid>
      ))
      ) : (
      <Typography variant="h6" align="center" color="text.secondary" sx={{ width: '100%', mt: 3 }}>
        No movies found for the selected filters.
      </Typography>
      )}
    </Grid>
    )}

    {!loading && movies.length > 0 && (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Button
      variant="contained"
      size="large"
      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
      Load More
      </Button>
    </Box>
    )}
  </Container>
  );
}