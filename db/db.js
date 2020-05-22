/*nnconst sqlite3 = require('sqlite3').verbose();
//Skaber en database objekt.
let db = new sqlite3.Database(':insole:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the insole database.');
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/



const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});



