import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Paper,
  Avatar, Stack, useTheme
} from '@mui/material';
import LockOutLinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // toggle between login and register
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin({ username });
      toast.success('Login successful!');
      navigate('/'); // to homepage
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.warning('Passwords do not match.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some((u) => u.username === username);

    if (userExists) {
      toast.info('User already exists. Please log in.');
    } else {
      const newUser = { username, password };
      localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
      toast.success('Registration successful. Please log in.');
      setIsRegistering(false);
    }
  };

  return (
    <>
    {/*toast message container*/}
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 6,
            borderRadius: 4,
            width: 380,
            backgroundColor: '#ffffff',
          }}
        >
          <Stack alignItems="center" spacing={1} mb={3}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <LockOutLinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {isRegistering ? 'Create Account' : 'Movie Explorer'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isRegistering ? 'Please register to continue' : 'Login to your account'}
            </Typography>
          </Stack>

          {/*Input username*/}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/*Input passowrd*/}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />

          {/*confirm password field*/}
          {isRegistering && (
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {/*submit button*/}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.3, fontWeight: 'bold', borderRadius: 2 }}
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </Button>

          {/*login and register mode*/}
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? 'Already have an account? Log In'
              : "Don't have an account? Register"}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
