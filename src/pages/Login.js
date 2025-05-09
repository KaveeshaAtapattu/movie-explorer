import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin({ username });
      navigate('/');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some((u) => u.username === username);

    if (userExists) {
      alert('User already exists. Please log in.');
    } else {
      const newUser = { username, password };
      localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
      alert('Registration successful. Please log in.');
      setIsRegistering(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" gutterBottom>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering && (
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={isRegistering ? handleRegister : handleLogin}
          sx={{ mt: 2 }}
        >
          {isRegistering ? 'Register' : 'Log In'}
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={() => setIsRegistering(!isRegistering)}
          sx={{ mt: 1 }}
        >
          {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Register"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
