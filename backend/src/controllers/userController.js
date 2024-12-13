const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userController = {
  // Register new user

  register: async (req, res) => {
    try {
      const { name, email, password, phone, age, sex } = req.body;
      
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        age,
        sex
      });

      await user.save();

      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });

      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
        .populate('appointments');
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

};

module.exports = userController;
