import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';


export default function MovieCard({ movie }) {
    return (
        <Card sx={{ width: 300, margiin: 1}}>
            <CardMedia
                component="img"
                height="300"
                image = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}>

            </CardMedia>

            <CardContent>
                <Typography variant="h6" noWrap>{movie.title}</Typography>
                <Typography variant="body2">Year: {movie.release_date?.slice(0, 4)}</Typography>
                <Typography variant="body2">Rating: {movie.vote_average}</Typography>
      
            </CardContent>

        </Card>
    );
}