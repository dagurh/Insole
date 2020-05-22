const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const Identity = JSON.parse(
  fs.readFileSync('../secrets/SECRET.json', 'utf8')
);

// pool connection?
const pool = sqlite3.createPool({
  host: 'itwot00.cs.au.dk',
  user: Identity.user,
  password: Identity.password,
  database: 'VM07'
});

// open an in-memory database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

/* Make connection to pool and create the one table? */
pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query(
    `CREATE TABLE IF NOT EXISTS insole
            (timestamp BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, temperature INT, humidity INT)`,
    err => {
      if (err) throw err;
    }
  );
  connection.release();
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});



