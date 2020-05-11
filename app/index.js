'use strict';
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const Measurements = require('../db/db').Measurements;
const views = require('../views/views');
const process = require('process');
const app = express();
const port = 7000;
const wsPort = 8000;
const wss = new WebSocket.Server({
  port: wsPort
});

app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log(`request.url=${request.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

/* Create new resource */
app.post('/', (request, response, next) => {
  const data = {
    temperature: request.body.temperature,
    humidity: request.body.humidity,
    timestamp: request.body.timestamp
  };
  Measurements.create(data, (err, response) => {
    if (err) return next(err);
    sendToWSClients(JSON.stringify(data));
  });
  response.status(200);
  response.send();
  next();
});

/* Retrieve the state of a resource */
app.get('/', (request, response, next) => {
  if (!request.query.input) {
    Measurements.all((err, measurements) => {
      if (err) return next(err);
      response.send(views.measurementsView(measurements));
    });
  } else {
    Measurements.limit(Number(request.query.input), (err, measurements) => {
      if (err) return next(err);
      response.send(views.measurementsView(measurements));
    });
  }
});

/* Only getting the data */
app.get('/data', (request, response, next) => {
  Measurements.all((err, measurements) => {
    if (err) return next(err);
    response.send(measurements);
  });
});

app.listen(port, err => {
  if (err) return console.error(`An error occurred: ${err}`);
  console.log(`Listening on http://localhost:${port}/`);
});

// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on('connection', ws => {
  // runs a callback on measurement event
  ws.on('measurement', data => {
    // sends the data to all connected clients
    console.log('wss:', data);
    sendToWSClients(data);
  });
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

function sendToWSClients (data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function heartbeat () {
  this.isAlive = true;
}

const interval = setInterval(function ping () {
  wss.clients.forEach(function each (ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close () {
  clearInterval(interval);
  console.log('the interval has been cleared');
});

process.on('SIGINT', () => {
  console.log('SIGINT received; exiting...');
  wss.close();
  process.exit();
});
