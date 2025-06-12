import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import LoginPage from './pages/LoginPage';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AuthGuard from './components/AuthGuard';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/officer" element={
            <AuthGuard allowedRoles={["OFFICER", "ADMIN"]}>
              <OfficerDashboard />
            </AuthGuard>
          } />
          <Route path="/admin" element={
            <AuthGuard allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </AuthGuard>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
