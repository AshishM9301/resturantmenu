const express = require('express');

const router = express.Router();

router.post('/add', (req, res) => {
  const { ordererId } = req.body;
});

module.exports = router;
