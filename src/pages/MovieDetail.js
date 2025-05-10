import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {Button, Grid, Box, Typography, CircularProgress, Chip,useTheme, Card, CardMedia,CardContent, Divider} from "@mui/material";
import FavoritesContext from "../context/FavoritesContext";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [trailerKey, setTrailerKey] = useState(""); //store trailer video key
  const theme = useTheme();


  useEffect(() => {
    // fetch movie details using API
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `${BASIC_URL}/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      }
    };
    //fetch cast details
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `${BASIC_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        setCast(response.data.cast.slice(0, 5));
      } catch (error) {
        console.error("Error fetching Cast detail:", error);
      }
    };


    //fetch trailer key
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `${BASIC_URL}/movie/${id}/videos?api_key=${API_KEY}`
        );
        const trailer = response.data.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchMovieDetail();
    fetchCast();
    fetchTrailer();
  }, [id]);

  // loading indicater
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

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <Box sx={{ px: 4, py: 5, backgroundColor: theme.palette.background.default }}>
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

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom color="primary">
            {movie.title}
          </Typography>

          <Button
            variant={isFavorite ? "contained" : "outlined"}
            color="secondary"
            onClick={() => toggleFavorite(movie)}
            sx={{ mb: 2 }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>

          {/* Genres */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {movie.genres?.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>

          <Typography variant="body1" paragraph>
            <strong>Overview:</strong> {movie.overview}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2"><strong>Release Date:</strong> {movie.release_date}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2"><strong>Rating:</strong> {movie.vote_average}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2"><strong>Popularity:</strong> {movie.popularity.toFixed(1)}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2"><strong>Vote Count:</strong> {movie.vote_count}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2"><strong>Original Title:</strong> {movie.original_title}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2"><strong>Language:</strong> {movie.original_language.toUpperCase()}</Typography>
            </Grid>
          </Grid>
            {/*Show trailer if key available*/}
          {trailerKey && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Watch Trailer
              </Typography>
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px'
                  }}
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Cast Section */}
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }} color="primary">
        Top Cast
      </Typography>
      <Grid container spacing={3}>
        {cast.map((actor) => (
          <Grid item xs={6} sm={4} md={2} key={actor.id}>
            <Card sx={{ textAlign: "center", p: 1, borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                sx={{ borderRadius: 2, height: 220, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="subtitle2">{actor.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  as {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieDetail;
