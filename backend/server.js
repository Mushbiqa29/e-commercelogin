const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory users array
let users = [];

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'mushbiqa@gmail.com',
  password: '1234',
  role: 'admin'
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

// Middleware to verify JWT token
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // For simplicity, we'll just set a user flag
      req.user = { _id: decoded.id };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware
const adminProtect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Check if it's an admin token (starts with 'admin_')
      if (decoded.id.startsWith('admin_')) {
        req.admin = { _id: decoded.id };
        next();
      } else {
        res.status(401).json({ message: 'Not authorized as admin' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Auth Routes

// Register user
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      date: new Date()
    };

    users.push(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find(user => user.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile
app.get('/api/auth/profile', protect, async (req, res) => {
  const user = users.find(user => user._id === req.user._id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Admin Routes

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check hardcoded admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const admin = {
        _id: 'admin_' + Date.now().toString(),
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role
      };

      res.json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users (admin only)
app.get('/api/admin/users', adminProtect, async (req, res) => {
  try {
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user (admin only)
app.delete('/api/admin/users/:id', adminProtect, async (req, res) => {
  try {
    const userIndex = users.findIndex(user => user._id === req.params.id);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
