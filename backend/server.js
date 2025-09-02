const express = require('express');
const cors = require('cors');

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

// Auth Routes

// Register user
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = {
      _id: Date.now().toString(),
      name,
      email,
      password,  
      date: new Date()
    };

    users.push(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: "Login Success"
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile (no JWT check, just returns first user for demo)
app.get('/api/auth/profile', (req, res) => {
  if (users.length > 0) {
    const { password, ...userWithoutPassword } = users[0];
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Admin Routes

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  try {
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
        message: "Admin Login Success"
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users (admin only – simplified, no token check now)
app.get('/api/admin/users', (req, res) => {
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


app.delete('/api/admin/users/:id', (req, res) => {
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
