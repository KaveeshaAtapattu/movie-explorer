import axios from 'axios';
import { Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASIC_URL = 'https://api.themoviedb.org/3';

<Route path = "/movie/:id" element={<MovieDetail />} />

console.log('TMDB API KEY: ',API_KEY);

export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get (`${BASIC_URL}/trending/movie/week`,{
            params: { 
                api_key:API_KEY
            }

        });
        return response.data.results;
    
    }catch (error){
        console.error('Error Fetching Trending Movies : ', error);
        return [];

    }

};