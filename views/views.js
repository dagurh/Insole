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
        href: 'style/.css'
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

function createBarChart () {
  return h1('Data measurements') +
  div('', { id: 'Table' }) +
  div(
    canvas('', { id: 'BarChart' })
  );
}

function createLineChart () {
  return h1('Data measurements') +
  div(
    canvas('', { id: 'LineChart' })
  );
}

exports.measurementsView = function measurements (measurements = []) {
  return page(
    'Data measurements',
    div(
    h3() +
    a('index', {href: './frontPage/index.html'})+
    b()
    ,{ class: 'headText' }) +
    br() +
    div(
    div(
    createBarChart()
   , { class: 'barChart' }) +
   div(
   createLineChart()
   , {class: 'lineChart'}) 
    , { class: 'box' })
  );
};
