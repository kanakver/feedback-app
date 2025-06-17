const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Admin routes
router.post('/login', adminController.login);
router.post('/setup', adminController.createInitialAdmin);
router.get('/dashboard', auth, adminController.dashboard);

module.exports = router; 