const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// gets all data from the tags table
router.get('/', (req, res) => {
  let queryString = `SELECT * FROM "tags" ORDER BY "name" ASC;`;

  pool.query(queryString)
  .then ( result => {
    res.send(result.rows)
  })
  .catch( err => {
    console.log('Error in getting data from Tags table:', err);
    res.sendStatus(500);
  });
});

module.exports = router;