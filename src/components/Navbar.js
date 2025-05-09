import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Switch } from "@mui/material";
import { Link } from "react-router-dom"; 

const Navbar = ({ toggleTheme }) => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>

        
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ marginRight: 2 }} 
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/favorites"
          >
            Favorites
          </Button>
          <Button color="inherit" component={Link} to="/search" sx={{ marginLeft: 2 }}>
            Search
          </Button> 

          <Switch onChange={toggleTheme} /> 

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
