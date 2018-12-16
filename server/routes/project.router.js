const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// get projects from DB tables "projects" & "tag" and return all of them 
router.get('/', (req, res) => {
  let queryString = `SELECT "projects"."id", "projects"."name", "projects"."thumbnail", "projects"."description", "projects"."github", 
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


router.post('/', (req, res) => {
  let queryString =`INSERT INTO "projects" ("name", "description", "github", "date_completed", "tag_id")
                    VALUES ($1, $2, $3, $4, $5);`;
  
  pool.query(queryString, [req.body.name, req.body.description, req.body.github, req.body.date_completed, req.body.tag_id])
  .then( result => {
    res.sendStatus(200);
  })
  .catch( err => {
    res.sendStatus(500);
  })
})


// DELETE
router.delete('/:id', (req, res) => {
  console.log('delete in SERVER:', req.params.id)
  let queryString = `DELETE FROM "projects" WHERE "id"=$1;`;
  pool.query(queryString, [req.params.id])
  .then( () => {
    res.sendStatus(200);
  })
  .catch( err => {
    console.log('Error in delete project from DB:', err);
    res.sendStatus(500);
  })
})


module.exports = router;
