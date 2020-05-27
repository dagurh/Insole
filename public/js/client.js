/* global WebSocket */

const connection = new WebSocket('wss://itwot.cs.au.dk/VM03/wsa');
// 'wss://itwot.cs.au.dk/VM03/wsa'

connection.onopen = event => {
  console.log('WebSocket is open now.');
};

connection.onclose = event => {
  console.log('WebSocket is closed now.');
};

connection.onerror = event => {
  console.error('WebSocket error observed:', event);
};

connection.onmessage = event => {
  console.log('Received over WSS: ', JSON.parse(event.data));
  receivedMeasurement(JSON.parse(event.data));
};

const latest = document.querySelector('#latest');

function receivedMeasurement (measurement) {
  addNewRow(measurement);
  // deleteTableRow();
  addData(measurement);
}

/**
 * Adding a new row.
 * This function is adding a new row to the table.
 */

const tbody = document.querySelector('#tbody');

function addNewRow (measurement) {
  const row = document.createElement('tr');
  const time = document.createElement('td');
  const stand = document.createElement('td');
  time.textContent = new Date(measurement.timestamp).toLocaleString('da-DK');
  stand.textContent = measurement.standing_or_sitting;
  row.appendChild(time);
  row.appendChild(stand);
  tbody.prepend(row);
}
/*
function deleteTableRow () {
  const totalRowCount = tbody.rows.length;
  console.log(totalRowCount);
  tbody.deleteTableRow(totalRowCount - 1);
}
*/
function addData (measurement) {
  lineChart.data.labels.push(new Date(measurement.timestamp).toLocaleString('da-DK'));
  lineChart.data.datasets[0].data.push(measurement.standing_or_sitting);
  lineChart.update();
}
