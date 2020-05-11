const mysql = require('mysql');
const fs = require('fs');
const Identity = JSON.parse(
  fs.readFileSync('../secrets/SECRET.json', 'utf8')
);

const pool = mysql.createPool({
  host: 'itwot00.cs.au.dk',
  user: Identity.user,
  password: Identity.password,
  database: 'VM07'
});

/* Make connection to pool and create the one table */
pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query(
    `CREATE TABLE IF NOT EXISTS measurements
            (timestamp BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, temperature INT, humidity INT)`,
    err => {
      if (err) throw err;
    }
  );
  connection.release();
});

/* Class to deal with measurements */
class Measurements {
  static all (callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('SELECT * FROM measurements ORDER BY timestamp DESC', (err, results, fields) => {
        callback(err, results);
        connection.release();
      });
    });
  }

  static limit (limit, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Limit: ' + this.limit);
      connection.query(
        'SELECT * FROM measurements ORDER BY timestamp DESC LIMIT ?', [limit],
        (err, results, fields) => {
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  static create (measurement, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        'INSERT INTO measurements(timestamp, temperature, humidity) VALUES (?, ?, ?)',
        [Date.now(), measurement.temperature, measurement.humidity],
        (err, results, fields) => {
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  static delete (id, callback) {
    if (!id) {
      return callback(new Error('Please provide an id'));
    }
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        'DELETE FROM measurements WHERE id = ?',
        [id],
        (err, results, fields) => {
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  static end () {
    pool.end(err => {
      if (err) throw err;
    });
  }
}

module.exports = pool;
module.exports.Measurements = Measurements;
