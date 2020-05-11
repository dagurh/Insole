'use strict';

const {
  html,
  head,
  title,
  body,
  h1,
  span,
  link,
  script,
  table,
  thead,
  tbody,
  th,
  tr,
  td,
  b,
  button,
  form,
  div,
  label,
  input,
  canvas
} = require('../modules/html');

function page (titleText, bodyText) {
  return html(
    head(
      title(titleText) +
      link({
        rel: 'stylesheet',
        type: 'text/css',
        media: 'screen',
        href: 'style/main.css'
      }) +

      script('', { src: 'js/Chart.min.js' }) +
      script('', { src: 'https://unpkg.com/axios/dist/axios.min.js' }) +
      script('', {
        defer: undefined,
        src: 'js/client.js'
      }) +
      script('', {
        defer: undefined,
        src: 'js/main.js'
      })
    ) +
    body(bodyText));
}

exports.measurementsView = function measurements (measurements = []) {
  return page(
    'Data measurements',
    form(
      h1('Temperature & Humidity in My Apartment') +
      div(label('How many of the latest measurements will you like to see: ', { for: 'input' }) +
        input('', { type: 'number', min: '0', id: 'input', name: 'input' })) +
         div(button('Submit', { type: 'submit', class: 'button' })),
      { method: 'GET', action: ' ', id: 'measurements-form' }) +
    b('Latest live measurement: ' +
      span('', {
        id: 'latest'
      })
    ) +
    table(
      thead(
        tr(th('Timestamp') + th('Temperature') + th('Humidity'))
      ) +
      tbody(
        measurements.reduce((acc, measurement) => {
          acc +=
            tr(
              td(new Date(measurement.timestamp).toLocaleString('da-DK')) +
              td(measurement.temperature) +
              td(measurement.humidity)
            );
          return acc;
        }, ''), { id: 'tbody' }
      )
      , { id: 'table' }) + // To get the table in client
    div('', { id: 'measurementTable' }) +
    div(canvas('', { id: 'measurementChart' }), { style: 'position:relative; height:30vh; width:70vw' })
  );
};
