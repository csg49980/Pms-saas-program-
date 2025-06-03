const express = require('express');
const fs = require('fs').promises;
const app = express();

let usersData = null;

const loadData = async () => {
  try {
    const data = await fs.readFile('./data/users.json', 'utf8');
    usersData = JSON.parse(data);
  } catch (err) {
    console.error('Failed to load user data:', err);
  }
};

loadData();

app.get('/users', (req, res) => {
  if (usersData) {
    res.json(usersData);
  } else {
    res.status(500).send('User data not loaded');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
