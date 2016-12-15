#Square The Box

**By;** 

```
Emre Sardogan

```

**Parsons School of Design;**

```
Device Art - BFA_DT

Lab: Systems - BFA_DT

Studio: Systems - BFA_DT
```

**Special Thanks To;**

```
Pamela Liou

Bryan Collinsworth - Miri Park

Marisa Jahn
```
**GitHub Repo;**

```
https://github.com/emres13/emresardogancode2
```

This is a creative coding sketch which translates a Joseph Albers color theory painting in to a 3D artifact. The artifact gets data from the audience and creates a color scheme output according to the input.

## Artifact Images

Images of the artifact. 


![](https://github.com/emres13/Square-The-Box/blob/master/Artifact%20Images/IMAG0333.jpg)


![](https://github.com/emres13/Square-The-Box/blob/master/Artifact%20Images/IMAG0341.jpg)

![](https://github.com/emres13/Square-The-Box/blob/master/Artifact%20Images/IMAG0339.jpg)








## Thank You

Thanks to **[James Shih](https://github.com/jimmyadg)** 
 and **[Michael Braverman](https://github.com/mbrav)** 
for their contributions to the code.


##Prototyping 

In order to prototype the server-client relation and the serial connection that connects the p5.js sketch and arduino, I used; 

```
P5.js - jQuery.js - Node.js - p5serial.js - Arduino IDE
```

**Code Explanation :**

By using p5.js - node.js and multiple other libraries, I created the web page for audience to sign in and declare the color most associated with their feeling at that second. Secondly, I also ask the audience to explain that color-emotion relation with a single word answer.



##Files 

**Odd pot(1)**

node_modules

app.js

public

package.json

my_file.json

**Odd_pot(1)/Public**

assets

sketch.js

index.html

jquery.js

p5serialport.js

package.json

style.css



##Client - Web Page

**sketch.js**

First of all we create the connection between the client page and our serial port (arduino). We also call all the variables which will be in use during the rest of the sketch.

```
var serial;                            // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
var string="";

var input2, button, greeting;
var blue, red, green, orange, yellow, navy, purple, pink ;  // Declare variable 'img'.


var checkbox;

```

In our preLoad() function we load image files without executing them.

```
function preload(){

  //preload images for the colors
  blue = loadImage("assets/colorBlue.png"); 
  red = loadImage("assets/colorRed.png");
  green = loadImage("assets/colorGreen.png");
  orange = loadImage("assets/colorOrange.png");
  yellow = loadImage("assets/colorYellow.png");
  navy = loadImage("assets/colorNavy.png");
  purple = loadImage("assets/colorPurple.png");
  pink = loadImage("assets/colorPink.png");
}

```

In our setup() function, we make new instance with the serialport library and create an initial connection with the port (arduino). We also create the canvas size integrate with the clients screen display size.

```
function setup() {

  createCanvas(displayWidth, displayHeight);
  background(255);
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('data', serialEvent);  // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
 
```
Additionally, in our setup() function we also place the checkboxes and texts of the web page.

```

  textFont("Courier");
  
  //Checkbox under every color	
  checkbox = createCheckbox('red', false);
  checkbox.changed(myCheckedEvent1);
  checkbox.position(180,292);
  
  checkbox = createCheckbox('orange', false);
  checkbox.changed(myCheckedEvent2);
  checkbox.position(380, 292);
  
  checkbox = createCheckbox('yellow', false);
  checkbox.changed(myCheckedEvent3);
  checkbox.position(610,292);
  
  checkbox = createCheckbox('blue', false);
  checkbox.changed(myCheckedEvent4);
  checkbox.position(170, 509);
  
  checkbox = createCheckbox('navy', false);
  checkbox.changed(myCheckedEvent5);
  checkbox.position(385, 509);

  checkbox = createCheckbox('green', false);
  checkbox.changed(myCheckedEvent6);
  checkbox.position(610, 509);
  
  checkbox = createCheckbox('purple', false);
  checkbox.changed(myCheckedEvent7);
  checkbox.position(835, 509);
  
  checkbox = createCheckbox('pink', false);
  checkbox.changed(myCheckedEvent8);
  checkbox.position(840,292);

  textSize(18);
  text("please ; pick a color that associates with your feelings: ", 100, 68);
  text("please ; explain how you feel with a single word: ", 100, 570);
  text("color box dynamic output: ", 1200, 68);	
```

In our draw() function, we call the images and place them on the canvas. 

```

function draw() {
	
  //draw images on canvas		
  image(blue, 100, 310);
  image(green, 540, 310);
  image(yellow, 540, 90);
  image(orange, 320, 90)
  image(red, 100, 90)
  image(navy, 320, 310)
  image(purple, 760, 310)
  image(pink, 760, 90)
  
  //bigBox();
	  
}
```
myCheckedEvent() functions are getting used in order to create a string type output from the input data that client submitted. 

```

function myCheckedEvent1() {
  if (this.checked()) {
    console.log("Red!");
    string = "Red";  
  } else {
    console.log("Red Unchecked");
  }
} //checkbox listener red 
function myCheckedEvent2() {
  if (this.checked()) {
  console.log("Orange");
  string = "Orange";
} else {
    console.log("Orange Unchecked");
 }
} //checkbox listener orange 
function myCheckedEvent3() {
  if (this.checked()) {
    console.log("Yellow");
    string = "Yellow"; 
  } else {
    console.log("Yellow Unchecked");
  }
} //checkbox listener yellow 
function myCheckedEvent4() {
  if (this.checked()) {
    console.log("Blue");
    string = "Blue";
} else {
    console.log("Blue Unchecked");
  }
} //checkbox listener blue 
function myCheckedEvent5() {
  if (this.checked()) {
    console.log("Navy");
    string = "Navy";
} else {
    console.log("Navy Unchecked");
  }
} //checkbox listener navy 
function myCheckedEvent6() {
  if (this.checked()) {
    console.log("Green");
    string = "Green Unchecked";
} else {
    console.log("Green");
  }
} //checkbox listener green 
function myCheckedEvent7() {
  if (this.checked()) {
    console.log("Purple");
    string = "Purple";
} else {
    console.log("Purple Unchecked");
  }
} //checkbox listener purple 
function myCheckedEvent8() {
  if (this.checked()) {
    console.log("Pink");
    string = "Pink";
  } else {
    console.log("Pink Unchecked");
  }
} //checkbox listener pink 

```
These series of functions are needed for the port connection. mouseDragged() function send the first data to arduino, and arduino starts listening after that point. I was using keyPressed() function for a possible loss of connection on serial port. serialEvent() is for reading and saving the variable that comes from serial port. And serialError() identifies possible errors.

```

function mouseDragged() {
  // map the mouseY to a range from 0 to 255:
  outByte = int(map(mouseY, 0, height, 0, 255));
  // Convert it to a string with a newline at the end,
  // and send it out the serial port:
  serial.write(outByte + '\n');
}

function keyPressed() {
  if (key ==='H' || key ==='L') {   // if the user presses H or L
    serial.write(key);      // send it out the serial port
  }
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
```


##Server - Terminal 

**app.js**

We start with calling the libraries that we need, which are socket.io and express.io. After that we create the connection and start listening as the server from port 8080 which is a localhost on my device. Lastly we call the rest of the variables that we need. 

```

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 8080;
var fs = require('fs');
var util = require('util');

connections = [];

```
In this part of the code we create the connection with the clients and create multiple sockets for multiple users. We also start reading messages on our terminal. 

```
server.listen(process.env.PORT || port);
console.log('running');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    connections.push(socket);
    console.log(' %s people voted', connections.length);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log(' voter disconnected', connections.length);

    });
    
  	socket.on('send message', function(data) {
        // var str = data.split(" ");
        console.log("message read", data);

```
This is an important part in the code. In this part we create a JSON file in order to save the input data. We create the file by asking it to try reading it first, if it doesn't exist we create the file. If it exists we start writing inside that file. Just to clean up our data a little bit, we rearrange the string. 

```
fs.readFile('my_file.json', 'utf8', function(err, json) {

        	if (json == undefined) {
        		fs.appendFile('./my_file.json', util.inspect({}), 'utf-8');
        	}

            console.log("JSON read", json);

            var color =  data.color.toLowerCase();
            var word =  data.word.toLowerCase();

            // check if the color already exists
            if (json.word === undefined) {
            	// if it does not 
            	// create object
                var obj = {
                    color: color,
                    words: [word]
                }

 
                // add object to JSON file
                fs.appendFile('./my_file.json', util.inspect(obj), 'utf-8');
            } 
            // if it does
            else {
            	// add new emotion
            	json.words.push(word);
            }
        });
 });
});

```

##Javascript

**index.html**

In our index.html file we start by calling all the libraries, and the files that we need in this whole node app. 

```
<!DOCTYPE html>
<html>
  <head>
  	
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.4/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.4/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.4/addons/p5.sound.min.js"></script>
    <script language="javascript" type="text/javascript" src="p5.serialport.js"></script>
		
    <link rel="stylesheet" type="text/css" href="style.css">
	
  </head>
  <body>
 
      	<script src="jquery.js"></script>
     	<script src = "/socket.io/socket.io.js"></script>
		<script src="sketch.js"></script>
 
```
 
After that we create a submit box, and an input section on our page we locate them inside our css file. We also have a jquery function located in our index.html file. test() function is the core function for string delivery to our server. 


```
 <form id="form">
 		
 		<input type="text" id="inputMe">
		<input type="button" value="submit" id ="touchMe" onClick="test();">
 
 <script>
  	function test(){
  
		var socket = io.connect();
		var $touchMe = $('#touchMe');
		var $inputMe = $('#inputMe');
		var message = string + " " +$inputMe.val();
 		//console.log("test");

    var obj = {
      color: string,
      word: $inputMe.val(),
      // message: message
    }

    // socket.emit('send message', message);
 		socket.emit('send message', obj);
 		$inputMe.val('');
 }
 
 
 </script>
 </form>
 		
<script>
</script>

  </body>
</html>

```
##Arduino

**p5ConnectionArduino.ino**

Since the code is in a work in progress condition, the arduino code is only capable of checking the connection between the serial port by using ASCII method of communication.
In this code here, we include the only library that we need "FastLED.h" and we also add the attributes of the connected LED strip.

```
#include "FastLED.h"

#define NUM_LEDS 60
int incomingByte;      // a variable to read incoming serial data into
#define DATA_PIN 6
CRGB leds[NUM_LEDS];
```
In our setup() function we initialize the led strip and the serial.

```

void setup() {
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(leds, NUM_LEDS);
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
}
```
In our loop function we start listening the serial port for the input that we get from client (sketch.js). If H is pressed on the client side Arduino reads incoming byte as 72 and turns the LEDs blue. Repeats the same thing with L (76) and turns the LED's red. But as I said since it is a work in progress this is just for debugging a possible connection lost between on the serial port.

```
void loop() {
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
   
    
    // if it's a capital H (ASCII 72), turn on the LED:
    if (incomingByte == 'H') {
      FastLED.clear();
      FastLED.setBrightness(100);

      for (int x = 0; x < 20; x++) {

        leds[x] = CRGB::Blue;
        FastLED.show();
      }
    }
    // if it's an L (ASCII 76) turn off the LED:
    if (incomingByte == 'L') {
      
      FastLED.clear();
      FastLED.setBrightness(100);

      for (int x = 0; x < 20; x++) {
        leds[x] = CRGB::Red;
        FastLED.show();
      }
      Serial.write(incomingByte);
    }
  }
}

```



##What is missing?

Right now (December 15, 2016) the code is on the stage where it has a solid connection with the arduino, the client server is reading the input and prints it in a JSON file. 

For the full satisfaction of the product, the code needs to read and understand the JSON file that is filled with the data that client server sends. After understanding and analyzing the data, over the serial port server will send the data to arduino with ASCII keys. As the last step, Arduino will give you an output reflecting the input. 







