'use strict';

const {
  html,
  form,
  head,
  title,
  body,
  h1,
  h3,
  div,
  label,
  input,
  button,
  link,
  script,
  table,
  thead,
  tbody,
  th,
  tr,
  td,
  br,
  canvas,
  b
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
      script('', {
        defer: undefined,
        src: 'js/client.js'
      }) +
      script('', {
        defer: undefined,
        src: 'js/main.js'
      }) +
      script('', {
        defer: undefined,
        src: 'js/Chart.min.js'
      })
    ) +
    body(bodyText));
}

function numberOfData () {
  return form(
    div(
      label('Number of measurements ', { for: 'input' }) +
        input({ type: 'number', id: 'input', name: 'input', min: '0',}) +
        div('', { id: 'number-feedback', class: 'feedback' })) +
      div(
        button('Submit', { type: 'submit' })), { method: 'GET', action: '', id: 'measurements-form' });
}

function createChart () {
  return h1('Data measurements') +
  numberOfData() +
  div('', { id: 'Table' }) +
  div(
    canvas('', { id: 'Chart' })
  );
}

function createTempChart () {
  return div('', { id: 'Table' }) +
  div(
    canvas('', { id: 'Chart2' })
  );
}

function createHumidChart () {
  return div('', { id: 'Table' }) +
  div(
    canvas('', { id: 'Chart3' })
  );
}

exports.measurementsView = function measurements (measurements = []) {
  return page(
    'Data measurements',
    div(
    h3('Neonious Data Website') +
    b('This website shows the temperature and humidity inside my appartment.')
    ,{ class: 'headText' }) +
    br() +
    div(
    div(
    createChart()
   , { class: 'chart' }) +
   div(
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
    )
   , { class: 'dataList' })
    , { class: 'box' }) +
    div(
      div(
    createTempChart() 
    , { class: 'temp' }) +
      div(
    createHumidChart()
      , { class: 'humid' })
    , { class: 'box2' })
  );
};
