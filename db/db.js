const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./insole.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the insole database.');
});

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS measurements
  (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, timestamp BIGINT, standing_or_sitting INTEGER)`);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});




