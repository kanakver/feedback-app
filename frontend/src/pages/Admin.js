import React, { useState } from 'react';
import { adminService } from '../services/adminService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

const Admin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [dashboardData, setDashboardData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminService.login(form);
      setIsLoggedIn(true);
      fetchDashboard();
    } catch (err) {
      setError('Login failed.');
    }
    setLoading(false);
  };

  const fetchDashboard = async () => {
    try {
      const data = await adminService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard.');
    }
  };

  const handleLogout = () => {
    adminService.logout();
    setIsLoggedIn(false);
    setDashboardData(null);
  };

  React.useEffect(() => {
    if (isLoggedIn && !dashboardData) {
      fetchDashboard();
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Box maxWidth={400} mx="auto" mt={4}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    );
  }

  return (
    <Box maxWidth={900} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>Admin Dashboard</Typography>
      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mb: 2 }}>
        Logout
      </Button>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {dashboardData ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Total Feedback: {dashboardData.totalFeedback}
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.latestFeedbacks.map((fb) => (
                  <TableRow key={fb._id}>
                    <TableCell>{fb.name || <em>Anonymous</em>}</TableCell>
                    <TableCell>{fb.email || <em>-</em>}</TableCell>
                    <TableCell>{fb.feedback}</TableCell>
                    <TableCell><Rating value={fb.rating} readOnly size="small" /></TableCell>
                    <TableCell>{new Date(fb.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography>Loading dashboard data...</Typography>
      )}
    </Box>
  );
};

export default Admin; 