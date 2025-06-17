const Feedback = require('../models/Feedback');

// Submit new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    
    // Emit the new feedback event
    req.app.get('io').emit('newFeedback', feedback);
    
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all feedback (admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback statistics
exports.getStats = async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);
    
    const ratingDistribution = await Feedback.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      total,
      averageRating: avgRating[0]?.average || 0,
      ratingDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 