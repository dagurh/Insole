'use strict';
/* global XMLHttpRequest Chart */
const measurementChartCtx = document.querySelector('#measurementChart');
let mychart;

const request = new XMLHttpRequest();
const requestURL = 'data';
request.onload = () => {
  if (request.status === 200) {
    const measurement = JSON.parse(request.response);
    console.log(measurement);
    const chartData = transformToChartData(measurement);
    createStackedHBarChart(chartData);
  }
};
request.open('GET', requestURL);
request.setRequestHeader('Accept', 'application/json');
request.send();

/* Transforming the data into chart data */
function transformToChartData (measurements = []) {
  const temperature = [];
  const humidity = [];
  const timestamp = [];
  const urlParams = new URLSearchParams(window.location.search);
  const mychart = urlParams.get('input');
  let i;
  if (mychart) {
    for (i = 0; i < mychart; i++) {
      temperature.push(measurements[i].temperature);
      humidity.push(measurements[i].humidity);
      timestamp.push(new Date(measurements[i].timestamp).toLocaleString('da-DK'));
    }
    return { temperature, humidity, timestamp };
  } else {
    for (const m of measurements) {
      temperature.push(m.temperature);
      humidity.push(m.humidity);
      timestamp.push(new Date(m.timestamp).toLocaleString('da-DK'));
    }
    return { temperature, humidity, timestamp };
  }
}

/* Styling to the chart */
function createStackedHBarChart (chartData = []) {
  if (measurementChartCtx) {
    mychart = new Chart(measurementChartCtx, {
      type: 'line',
      data: {
        labels: chartData.timestamp,
        datasets: [
          {
            label: 'humidity',
            fill: false,
            data: chartData.humidity,
            backgroundColor: 'rgb(252, 186, 3)',
            borderColor: 'rgb(252, 186, 3)'
          },
          {
            label: 'temperature',
            fill: false,
            data: chartData.temperature,
            backgroundColor: 'rgb(27, 156, 242)',
            borderColor: 'rgb(27, 156, 242)'
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'A chart with measurements of temperature and humidity'
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Temperature & Humidity'
              }
            }
          ]
        }
      }
    });
  }
}
