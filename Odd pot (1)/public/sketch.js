var serial;                            // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
var string="";

var input2, button, greeting;
var blue, red, green, orange, yellow, navy, purple, pink ;  // Declare variable 'img'.


var checkbox;


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


function setup() {

  createCanvas(displayWidth, displayHeight);
  background(255);
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('data', serialEvent);  // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
	  
		  
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

	
// 	input2 = createInput();
// 	input2.id('inputMe');
//  input2.position(100, 585);
//  input2.size(250, 14);
//  	
//  button = createButton('submit color + text');
//  button.id('touchMe');
//  button.position(365, 587);
//  button.mousePressed(greet);
  	
  	
}

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
  
  bigBox();
	  
}

function bigBox (){

  fill(200); //output by colorData input (4th top selected color)
  rect(1200, 90, 420, 420);
  fill(175); //output by colorData input (3rd top selected color)
  rect(1250, 165, 320, 320);
  fill(150); //output by colorData input (2nd top selected color)
  rect(1290, 220, 240, 240);
  fill(125); //output by colorData input (Most selected color)
  rect(1320, 260, 180, 180);
	  
}

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

