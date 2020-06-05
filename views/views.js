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
  b,
  a
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
    canvas('', { id: 'BarChart' })
  );
}

exports.measurementsView = function measurements (measurements = []) {
  return page(
    'Data measurements',
    div(
    h3('Neonious Data Website') +
    a('index', {href: '../something.html'})+
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
        tr(th('Timestamp') + th('Standing_or_sitting'))
      ) +
      tbody(
        measurements.reduce((acc, measurement) => {
          acc +=
            tr(
              td(new Date(measurement.timestamp).toLocaleString('da-DK')) +
              td(measurement.standing_or_sitting)
            );
          return acc;
        }, ''), { id: 'tbody' }
      )
    )
   , { class: 'dataList' })
    , { class: 'box' })
  );
};
