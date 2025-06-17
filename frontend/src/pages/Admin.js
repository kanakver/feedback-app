import React, { useState } from 'react';
import { adminService } from '../services/adminService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';

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
    <Box maxWidth={700} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>Admin Dashboard</Typography>
      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mb: 2 }}>
        Logout
      </Button>
      {!dashboardData ? (
        <Typography>Loading dashboard data...</Typography>
      ) : (
        <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>Total Feedback: {dashboardData.totalFeedback}</Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Latest Feedbacks</Typography>
          <List>
            {dashboardData.latestFeedbacks && dashboardData.latestFeedbacks.length > 0 ? (
              dashboardData.latestFeedbacks.map((fb) => (
                <React.Fragment key={fb._id || fb.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={<><strong>{fb.name || 'Anonymous'}</strong> <Rating value={fb.rating} readOnly size="small" /></>}
                      secondary={fb.feedback}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No feedback yet." />
              </ListItem>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Admin; 