const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Feedback = require('../models/Feedback');

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create initial admin (for setup)
exports.createInitialAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin dashboard
exports.dashboard = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const latestFeedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(5);
    res.json({
      totalFeedback,
      latestFeedbacks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 