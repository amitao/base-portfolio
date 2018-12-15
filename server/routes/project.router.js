const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// get projects from DB tables "projects" & "tag" and return all of them 
router.get('/', (req, res) => {
  let queryString = `SELECT "projects"."id", "projects"."name", "projects"."thumbnail",  "projects"."description", "projects"."github", 
  "projects"."tag_id", "tags"."name" FROM "projects" LEFT OUTER JOIN "tags" ON "tags"."id" = "projects"."tag_id"
  ORDER BY "projects"."id" ASC;`;

  pool.query(queryString)
  .then( result => {
    res.send(result.rows);
  })
  .catch( err => {
    console.log('Error in getting projects in DB:', err);
    res.sendStatus(500);
  })
  
});

module.exports = router
