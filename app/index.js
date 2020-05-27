'use strict';
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const Insole = require('../db/db').Insole;

const views = require('../views/views');
const process = require('process');
const app = express();
const port = 6500;
const wsPort = 2000;
const wss = new WebSocket.Server({
  port: wsPort
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((request, response, next) => {
  console.log(`request.url=${request.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.post('/', (request, response, next) => {
  const data = {
    timestamp: Date.now(),
    standing_or_sitting: request.body.standing_or_sitting
  };

  Insole.create(data, (err, result) => {
    if (err) response.status(400).send();
    console.log(data);
    response.status(200);
    response.send();
    sendToWSClients(JSON.stringify(data));
    next();
  });
});

app.get('/', (request, response, next) => {
  if (!request.query.input) {
    Insole.all((err, measurements) => {
      if (err) return next(err);
      response.send(views.measurementsView(measurements));
    });
  } else {
    Insole.limit(Number(request.query.input), (err, measurements) => {
      if (err) return next(err);
      response.send(views.measurementsView(measurements));
    });
  }
});

// Raw data
app.get('/data', (request, response, next) => {
  Insole.all((err, measurements) => {
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
  // runs a callback on message event
  ws.on('message', data => {
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
