import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      // Assume backend returns user role in token or as a field
      const role = data.role || 'OFFICER';
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/officer');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
};

export default LoginForm;
