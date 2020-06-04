'use strict'

var slider = document.getElementById("range");
var output = document.getElementById("procentage");
var img = document.getElementById('myImageId');
output.innerHTML = slider.value;


slider.oninput = function() {
  output.innerHTML = this.value;
  console.log(output);
  if(output.innerHTML < 10) {
    $(".0").show();
    $(".1").hide();
    $(".2").hide();
    $(".3").hide();
    $(".4").hide();
  }
  if(output.innerHTML >= 10 && output.innerHTML < 36 ) {
    $(".0").hide();
    $(".1").show();
    $(".2").hide();
    $(".3").hide();
    $(".4").hide();
  }
  if(output.innerHTML >= 36 && output.innerHTML < 63){
    $(".0").hide();
    $(".1").hide();
    $(".2").show();
    $(".3").hide();
    $(".4").hide();
  }
  if(output.innerHTML >= 63 && output.innerHTML < 90) {
    $(".0").hide();
    $(".1").hide();
    $(".2").hide();
    $(".3").show();
    $(".4").hide();
  }
  if(output.innerHTML >= 90) {
    $(".0").hide();
    $(".1").hide();
    $(".2").hide();
    $(".3").hide();
    $(".4").show();
  }
  }


