'use strict';
/* global XMLHttpRequest Chart */

const insoleTable = document.querySelector('#Table');
// const insoleData = document.querySelector('#Chart');
const insoleBarData = document.querySelector('#BarChart');
// let lineChart = '';
let barChart = '';

if (insoleTable) {

  const request = new XMLHttpRequest();
  const requestURL = 'data';
  request.onload = () => {
    if (request.status === 200) {
      const measurements = JSON.parse(request.responseText);
      const chartData = transformToChartData(JSON.parse(request.response));
      console.log(chartData);
      // createLineChart(chartData);
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
  const labels = [];
  const standing_or_sitting = [];
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('input');
  var i;
  console.log(myParam);
  console.log(urlParams.has('input'));
  if (myParam) {
  for (i = 0; i < myParam; i++) {
    labels.push(new Date(measurements[i].timestamp).toLocaleString('da-DK'));
    standing_or_sitting.push(measurements[i].standing_or_sitting);
  }
  return { labels, standing_or_sitting };
}
else {
  for (const m of measurements) {
    labels.push(new Date(m.timestamp).toLocaleString('da-DK'));
    standing_or_sitting.push(m.standing_or_sitting);
  }
  return { labels, standing_or_sitting};
}
}

// function createLineChart (chartData = []) {
//   if (insoleData) {
//     lineChart = new Chart(insoleData, {
//       type: 'line',
//       data: {
//         labels: chartData.labels,
//         datasets: [
//           {
//             label: 'standing_or_sitting',
//             fill: false,
//             data: chartData.standing_or_sitting,
//             backgroundColor: 'red',
//             borderColor: 'red'
//           }
//         ]
//       },
//       options: {
//         legend: {
//           labels: {
//               fontColor: "white",
//               fontSize: 14
//           }
//       },
//         title: {
//           display: true,
//           text: 'Measurements',
//           fontColor: 'white',
//           fontSize: 18
//         },
//         responsive: true,
//         scales: {
//           xAxes: [
//             {
//               stacked: false,
//               display: false,
              
//             }
//           ],
//           yAxes: [
//             {
//               stacked: false,
//               gridLines: {
//                 color: "#FFFFFF"
//               },
//               ticks: {
//                 fontColor: 'white',
//                 max: 100,
//                 min: -10,
//                 stepSize: 0
//               }
//             }
//           ]
//         }
//       }
//     });
// lineChart.update();
// }
// }

function createBarChart(chartData = []) {
  if (insoleBarData) {
    barChart = new Chart(insoleBarData, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Standing',
            fill: false,
            data: chartData.standing_or_sitting,
            backgroundColor: 'red',
            borderColor: 'red' 
          },
            {
              label: 'Sitting',
              fill: false,
              data: chartData.standing_or_sitting,
              backgroundColor: 'blue',
              borderColor: 'blue'
            }
          ]
}
});
barChart.update();
        }
        }