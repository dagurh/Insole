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
  // addNewRow(measurement);
  addData(measurement);
}

/**
 * Adding a new row.
 * This function is adding a new row to the table.
 */

// const tbody = document.querySelector('#tbody');

// function addNewRow (measurement) {
//   const row = document.createElement('tr');
//   const stand = document.createElement('td');
//   stand.textContent = measurement.standing_or_sitting;
//   console.log(row);
//   console.log(tbody);
//   row.appendChild(stand);
//   tbody.prepend(row);
// }

function addData (measurement) {
  console.log("Udate chart", measurement);
  console.log(barChart.data.datasets[0].data[0]);
  console.log(barChart.data.datasets[1].data[0]);
  if(measurement.standing_or_sitting <= 0){
    let value = barChart.data.datasets[1].data[0];
    value++;
    barChart.data.datasets[1].data[0] = value;
    console.log(barChart.data.datasets[1].data[0]);
  }
  else {
    let value = barChart.data.datasets[0].data[0];
    value++;
    barChart.data.datasets[0].data[0] = value;
    console.log(barChart.data.datasets[0].data[0]);
  }
  barChart.update();
}
