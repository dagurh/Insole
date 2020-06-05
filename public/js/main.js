'use strict';
/* global XMLHttpRequest Chart */

const insoleTable = document.querySelector('#Table');
const insoleBarData = document.querySelector('#BarChart').getContext('2d');
const insoleLineData = document.querySelector('#LineChart')
console.log("barchart div", insoleBarData)
let barChart = '';
let lineChart = '';

if (insoleTable) {
  
  const request = new XMLHttpRequest();
  const requestURL = 'data';
  request.onload = () => {
    if (request.status === 200) {
      const measurements = JSON.parse(request.responseText);
      console.log("Measurements", measurements);
      const chartData = transformToChartData(measurements);
      console.log("Chart Data", chartData);
      createBarChart(chartData);
    }
  };
  request.open('GET', requestURL);
  request.setRequestHeader('Accept', 'application/json');
  request.send();
}

function h2 (text = '') {
  const h2 = document.createElement('h2');
  h2.textContent = text;
  return h2;
}

function td (text = '') {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

function th (text = '') {
  const th = document.createElement('th');
  th.textContent = text;
  return th;
}

function table (entries = []) {
  const table = document.createElement('table');
  
  const thead = document.createElement('thead');
  thead.appendChild(tr(entries[0], 'head'));
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  for (const line of entries) {
    tbody.appendChild(tr(line));
  }
  table.appendChild(tbody);
  
  return table;
}

function tr (line = {}, type = 'body') {
  const tr = document.createElement('tr');
  switch (type) {
    case 'head':
    for (const name of Object.keys(line)) {
      tr.appendChild(th(name));
    }
    break;
    
    case 'body':
    default:
    for (const name of Object.keys(line)) {
      tr.appendChild(td(line[name]));
    }
    break;
  }
  return tr;
}

function transformToChartData (measurements = []) {
  var i;
  let sitCounter = 0;
  let standCounter = 0;
  console.log("Measurements", measurements);
  for (i = 0; i < measurements.length; i++) {
    if(measurements[i].standing_or_sitting <= 1){
      sitCounter++;
      console.log(sitCounter);
    }
    else {
      standCounter++;
      console.log(standCounter);
    }
  }
  const standingHabit = { sitCounter, standCounter };
  console.log("Standing Habit", standingHabit);
  return standingHabit; // {labels: datoer med målinger, standing: står målinger, sitting: sidde målinger}
}

function createBarChart(chartData) {
  if (insoleBarData) {
    console.log("Sit Counter", chartData.sitCounter);
    console.log("Stand Counter", chartData.standCounter);
    barChart = new Chart(insoleBarData, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // Dates
        datasets: [
          {
            label: 'Standing',
            data: [50, 60, 70, 80, 75, 34, 45],
            backgroundColor: 'red',
            borderColor: 'red' 
          },
          {
            label: 'Sitting',
            data: [50, 40, 30, 20, 25, 66, 55],
            backgroundColor: 'blue',
            borderColor: 'blue'
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 100,
              suggestedMin: 0
            }
          }]
        }
      }
    });
      barChart = new Chart(insoleLineData, {
        type: 'bar',
        data: {
          labels: ["Today"], // Dates
          datasets: [
            {
              label: 'Standing',
              data: [chartdata.standCounter],
              backgroundColor: 'red',
              borderColor: 'red' 
            },
            {
              label: 'Sitting',
              data: [chartData.sitCounter],
              backgroundColor: 'blue',
              borderColor: 'blue'
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                suggestedMax: 100,
                suggestedMin: 0
              }
            }]
          }
        }
      });
      //barChart.update();
    }
  }
