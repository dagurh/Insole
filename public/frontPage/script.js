'use strict'

var slider = document.getElementById("range");
var sliderGoal = document.getElementById("rangeGoal");
var output = document.getElementById("procentage");
var outputGoal = document.getElementById("goal");
var img = document.getElementById('myImageId');
output.innerHTML = slider.value;
outputGoal.innerHTML = sliderGoal.value;
  $(".0").hide(); $(".med0").hide();
  $(".1").hide(); $(".med1").hide();
  $(".3").hide(); $(".med3").hide();
  $(".4").hide(); $(".med4").hide();
  $("#range").hide();
  
  $( "#procentage" ).click(function() {
  $("#range").toggle(); });





 // $(".stand").click(function(){
  //  $(".some").show();
 // }

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
  sliderGoal.oninput = function() {
  outputGoal.innerHTML = this.value;
  console.log(outputGoal);
  if(outputGoal.innerHTML < 10) {
    $(".med0").show();
    $(".med1").hide();
    $(".med2").hide();
    $(".med3").hide();
    $(".med4").hide();
  }
  if(outputGoal.innerHTML >= 10 && output.innerHTML < 36 ) {
    $(".med0").hide();
    $(".med1").show();
    $(".med2").hide();
    $(".med3").hide();
    $(".med4").hide();
  }
  if(outputGoal.innerHTML >= 36 && output.innerHTML < 63){
    $(".med0").hide();
    $(".med1").hide();
    $(".med2").show();
    $(".med3").hide();
    $(".med4").hide();
  }
  if(outputGoal.innerHTML >= 63 && output.innerHTML < 90) {
    $(".med0").hide();
    $(".med1").hide();
    $(".med2").hide();
    $(".med3").show();
    $(".med4").hide();
  }
  if(outputGoal.innerHTML >= 90) {
    $(".med0").hide();
    $(".med1").hide();
    $(".med2").hide();
    $(".med3").hide();
    $(".med4").show();
  }
  }

