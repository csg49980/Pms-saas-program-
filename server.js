const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Start with in-memory "users" data
let usersData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Get all users
app.get('/users', (req, res) => {
  res.json(usersData);
});

// Get user by id
app.get('/users/:id', (req, res) => {
  const user = usersData.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: usersData.length + 1, name };
  usersData.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
  const user = usersData.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = req.body.name || user.name;
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const index = usersData.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  usersData.splice(index, 1);
  res.json({ message: 'User deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
