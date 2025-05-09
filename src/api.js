import axios from 'axios';
import { Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = 'https://api.themoviedb.org/3';

<Route path = "/movie/:id" element={<MovieDetail />} />

console.log('TMDB API KEY: ',API_KEY);

export const fetchTrendingMovies = async (page = 1) => {
    try {
        const response = await fetch(`${BASIC_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        console.log("Fetched Movies:", data.results);
        return data; // THIS MUST BE HERE!
    } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        return null;
    }
};
