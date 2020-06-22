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
        href: 'frontPage/CSS/charts.css'
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
  return h1('DATA MEASUREMENTS') +
  div('', { id: 'Table' }) +
  div(
    canvas('', { id: 'BarChart' })
  );
}

function createLineChart () {
  return h1() +
  div(
    canvas('', { id: 'LineChart' })
  );
}

exports.measurementsView = function measurements (measurements = []) {
  return page(
    'Data measurements',
    div(
    a('CHARTS', {href: './'})+
    a('GOAL SETTING', {href: './frontPage/index.html'})+
    b()
    , { class: 'topnav' }) +
    br() +
    div(
    div(
    createBarChart()
   , { class: 'barChart' }) +
   br() +
   div(
   createLineChart()
   , {class: 'lineChart'}) 
    , { class: 'box' })
  );
};
