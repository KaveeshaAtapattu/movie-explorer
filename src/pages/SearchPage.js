import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Grid, Typography, CircularProgress } from "@mui/material";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = 'https://api.themoviedb.org/3';

const SearchPage = () => {
  const [query, setQuery] = useState(""); // State for search input
  const [movies, setMovies] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to handle search
  const handleSearch = async () => {
    if (!query) return; // Prevent empty search

    setLoading(true);
    try {
      const response = await axios.get(`${BASIC_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      {/* Search Input */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <TextField
          label="Movie Title"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginLeft: 2 }}
        >
          Search
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Movie Results */}
      {!loading && movies.length === 0 && query && (
        <Typography variant="h6" color="textSecondary">
          No results found for "{query}"
        </Typography>
      )}

      {/* Display the movie results */}
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {movie.release_date}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
