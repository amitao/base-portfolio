const pg = require('pg');
const url = require('url');

let config = {}

if (process.env.DATABASE_URL) {

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
  };
} else {

  config = {
    host: 'localhost',
    port: 5432,
    database: 'portfolio',
    max: 10,
    idleTimeoutMillis: 3000,
  };
}

const pool = new pg.Pool(config);

// log with its connected to the database
pool.on('connect', () => {
  console.log('Postgresql connected');
});

// logs error on idle client
pool.on('error', (err) => {
  console.log('Unexpected error in idle client', err);
  process.exit(-1);
})

module.exports = pool;