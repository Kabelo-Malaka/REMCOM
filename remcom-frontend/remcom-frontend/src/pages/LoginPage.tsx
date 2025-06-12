
import React from 'react';
import LoginForm from '../components/LoginForm';
import { Box } from '@mui/material';

const LoginPage: React.FC = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
    <LoginForm />
  </Box>
);

export default LoginPage;
