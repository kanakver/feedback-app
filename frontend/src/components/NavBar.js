import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Feedback App
      </Typography>
      <Box>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/feedback">
          Feedback
        </Button>
        <Button color="inherit" component={RouterLink} to="/admin">
          Admin
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavBar; 