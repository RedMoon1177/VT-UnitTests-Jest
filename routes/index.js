// routes/index.js
const express = require('express');
const router = express.Router();

// Example route that sends a JSON response
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

module.exports = router;
