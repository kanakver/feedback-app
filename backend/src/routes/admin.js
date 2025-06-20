const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes
router.post('/login', adminController.login);
router.post('/setup', adminController.createInitialAdmin);
router.get('/dashboard', adminController.dashboard);

module.exports = router; 