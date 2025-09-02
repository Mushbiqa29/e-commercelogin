const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory users array
let users = [];

// Register user
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

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
    email: user.email
  });
});

// Login user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'Login Success'
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
