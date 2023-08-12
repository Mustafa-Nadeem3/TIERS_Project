const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("Express Working");
  res.send('Express Working');
});

module.exports = router;