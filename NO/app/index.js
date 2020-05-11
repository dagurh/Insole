const axios = require('axios');
const DHT11_22 = require('../lib/dht11_22.js');
const sensor = new DHT11_22(25);

sensor.start((err, temp, humidity) => {
  if (err) console.log(err);
  // you may get some errors due to bad connection or checksums
  else {
    temp = Math.round(temp * 100) / 100;
    humidity = Math.round(humidity * 100) / 100;
    console.log(`Temperature:\t${temp}â„ƒ`);
    console.log(`Humidity:\t${humidity}%`);
    const data = {
      timestamp: Date.now(),
      temperature: temp,
      humidity: humidity
    };
    postMeasurements(data);
  }
}, 15000);

function postMeasurements (data) {
  axios
    .post('https://itwot.cs.au.dk/VM07/opg4b/', data)
    .then(response => {
      console.log('Status:', response.status);
    })
    .catch(error => {
      console.log(error);
    });
}
