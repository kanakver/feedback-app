const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

// Public routes
router.post('/', feedbackController.submitFeedback);

// Protected routes
router.get('/', auth, feedbackController.getAllFeedback);
router.get('/stats', auth, feedbackController.getStats);

module.exports = router; 