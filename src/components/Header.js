import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Movie Explorer
            </Typography>
            <Box>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
        
            </Box>
        </Toolbar>
    </AppBar>
    );
}