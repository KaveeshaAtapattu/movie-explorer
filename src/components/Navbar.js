import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router

const Navbar = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ marginRight: 2 }} // Add some margin for spacing
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
