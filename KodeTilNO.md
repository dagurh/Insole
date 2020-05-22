//vibration motor

//Vi prøvede at bruge export i de her følgende linjer, den tænder ved at bruge setType(gpio.ANALOG) men vi kan ikke styre den. 

//exports.ANALOG = 9;
//gpio.pins[9].setType(gpio.ANALOG);
//gpio.pins[9].exports.ANALOGL = 1;


//Her prøver vi at tænde den med ANALOG og slukke med INPUT. virker ikke.

//setInterval(function(){
//    gpio.pins[9].exports.ANALOG = 1;
//});
//gpio.pins[9].setType(gpio.INPUT);


//Prøvede at leje lidt med HIGH og LOW

//const HIGH = OUTPUT;
//const LOW = 0;
//gpio.pins[9].setType(gpio.HIGH);
//gpio.pins[9].setValue(gpio.LOW);


//Her prøvede vi setValue

//gpio.pins[9].setValue(0);

//setInterval(function(){
//    gpio.pins[9].setValue(0)
//} , 5000);