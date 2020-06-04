'use strict'

var slider = document.getElementById("range");
var output = document.getElementById("procentage");
var img = document.getElementById('myImageId');
output.innerHTML = slider.value;


slider.oninput = function() {
  output.innerHTML = this.value;
  console.log(output);
  if(output.innerHTML < 25) {
    $(".1").show();
    $(".2").hide();
    $(".3").hide();
    $(".4").hide();
  }
  if(output.innerHTML >= 25 && output.innerHTML < 50){
    $(".1").hide();
    $(".2").show();
    $(".3").hide();
    $(".4").hide();
  }
  if(output.innerHTML >= 50 && output.innerHTML < 75) {
    $(".1").hide();
    $(".2").hide();
    $(".3").show();
    $(".4").hide();
  }
  if(output.innerHTML >= 75) {
    $(".1").hide();
    $(".2").hide();
    $(".3").hide();
    $(".4").show();
  }
  }


