// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const studentController = require('./studentController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/students', studentController);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Student CRUD API!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
