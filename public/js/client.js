/* global WebSocket */

const connection = new WebSocket('wss://itwot.cs.au.dk/VM07/wsb');

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
  addNewRow(JSON.parse(event.data));
  addData(mychart, JSON.parse(event.data));
};

const latest = document.querySelector('#latest');

/* Function to handle the received measurements */
function receivedMeasurement (measurement) {
  if (latest) {
    latest.textContent = `${new Date(measurement.timestamp).toLocaleString('da-DK')}: 
    Temperature=${measurement.temperature}; 
    Humidity=${measurement.humidity}`;
  }
}

/* Add a new row to the table */
function addNewRow (measurement) {
  const selector = '#tbody';
  const theNewData = document.querySelector(selector);
  const tableRow = document.createElement('tr');
  const timeData = document.createElement('td');
  const tempData = document.createElement('td');
  const humData = document.createElement('td');
  timeData.textContent = new Date(measurement.timestamp).toLocaleString('da-DK');
  tempData.textContent = measurement.temperature;
  humData.textContent = measurement.humidity;
  tableRow.append(timeData);
  tableRow.append(tempData);
  tableRow.append(humData);
  theNewData.prepend(tableRow);
}

function addData (chart, data) {
  chart.data.labels.push();
  chart.data.datasets[0].data.push(data.humidity);
  chart.data.datasets[1].data.push(data.temperature);
  chart.update();
}
