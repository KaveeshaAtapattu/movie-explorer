import Login from './pages/Login'; 
import axios from 'axios';
import { Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = 'https://api.themoviedb.org/3';

<Route path = "/movie/:id" element={<MovieDetail />} />

console.log('TMDB API KEY: ',API_KEY);



export const fetchTrendingMovies = async (page = 1, genre = '', year = '', rating = [0, 10]) => {
    try {
        // Construct the query params
        const genreQuery = genre ? `&with_genres=${genre}` : '';
        const yearQuery = year ? `&year=${year}` : '';
        const ratingQuery = `&vote_average.gte=${rating[0]}&vote_average.lte=${rating[1]}`;

        const response = await axios.get(`${BASIC_URL}/discover/movie?api_key=${API_KEY}&page=${page}${genreQuery}${yearQuery}${ratingQuery}`);
        console.log("Fetched Movies:", response.data.results);
        return response.data; // Returning the movie data
    } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        return null; // Returning null in case of failure
    }
};

export const fetchMovieVideos = async (movieId) => {
    try {
        const response = await axios.get(`${BASIC_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch movie videos:", error);
        return null;
    }
};
