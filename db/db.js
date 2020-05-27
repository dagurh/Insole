'use strict';
const fs = require('fs');
const mysql = require('mysql');

const Identity = JSON.parse(
  fs.readFileSync('../secrets/SECRET.json', 'utf8')
);
const pool = mysql.createPool({
  host: 'itwot00.cs.au.dk',
  user: Identity.user,
  password: Identity.password,
  database: 'VM03'
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query(
    `CREATE TABLE IF NOT EXISTS insole
            (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, timestamp BIGINT, standing_or_sitting INT)`,
    err => {
      if (err) throw err;
    }
  );
  connection.release();
});

class Insole {
  static all (callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('SELECT * FROM insole ORDER BY id DESC', (err, results, fields) => {
        callback(err, results);
        connection.release();
      });
    });
  }

  static create (data, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        'INSERT INTO insole(timestamp, standing_or_sitting) VALUES (?, ?)',
        [data.timestamp, data.standing_or_sitting],
        (err, results, fields) => {
          callback(err, results);
          connection.release();
        }
      );
    });
  }

  static limit (limit, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Limit: ' + this.limit);
      connection.query(
        'SELECT * FROM insole ORDER BY id DESC LIMIT ?', [limit],
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
module.exports.Insole = Insole;
