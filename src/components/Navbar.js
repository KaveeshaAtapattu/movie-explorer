import React, { useState } from "react";
import {AppBar,Toolbar,Typography,Button,Box,useTheme,useMediaQuery,Switch,styled,IconButton,Avatar,Menu,MenuItem,Drawer,List,ListItem,ListItemText} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

// Dark/light mode switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
 
}));

const Navbar = ({ toggleTheme, user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
// logs out the user
  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  // Toggles the drawer open/close
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Movie Explorer
          </Typography>

          {/* Hamburger Menu */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    <ListItem button component={Link} to="/">
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/favorites">
                      <ListItemText primary="Favorites" />
                    </ListItem>
                    <ListItem>
                      <MaterialUISwitch onChange={toggleTheme} />
                    </ListItem>
                    {user && (
                      <>
                        <ListItem>
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.secondary.light,
                              color: theme.palette.primary.contrastText,
                              fontWeight: 700,
                              mr: 1,
                            }}
                          >
                            {user.username?.charAt(0).toUpperCase()}
                          </Avatar>
                          <ListItemText primary={user.username} />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                          <ListItemText primary="Log out" />
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            // Desktop View
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  fontWeight: 500,
                  "&:hover": {
                    color: theme.palette.secondary.light,
                  },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/favorites"
                sx={{
                  color: "white",
                  fontWeight: 500,
                  "&:hover": {
                    color: theme.palette.secondary.light,
                  },
                }}
              >
                Favorites
              </Button>
                {/* Theme Switch for light and dark mode*/}
              <MaterialUISwitch onChange={toggleTheme} />

              {user && (
                <>
                  <IconButton onClick={handleAvatarClick} sx={{ ml: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.secondary.light,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 700,
                        border: `2px solid ${theme.palette.primary.main}`,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        minWidth: 150,
                        borderRadius: 2,
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
