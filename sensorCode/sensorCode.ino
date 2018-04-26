
#define PINX A0 // x axis
#define PINY A1 // y axis
#define BUTTON 12 // reset pin
#define WIDTH 7 // random width pin
#define COLOR 2 // random color pin

unsigned long targetTime=0;
const unsigned long interval=500; 

void setup(){
//  Serial.begin(115200);
  Serial.begin(9600);
  pinMode(PINX, INPUT);
  pinMode(PINY, INPUT);
  pinMode(BUTTON, INPUT);
  pinMode(WIDTH, INPUT);
  pinMode(COLOR, INPUT);
}

void loop(){
  if(digitalRead(BUTTON)) {
    Serial.println("rst");
  }
  if(digitalRead(WIDTH)) {
    Serial.println("width");
  }
  if(digitalRead(COLOR)) {
    Serial.println("color");
  }
  if(millis()>=targetTime){
    targetTime= millis()+interval;
    Serial.println(String(analogRead(PINX))+","+String(analogRead(PINY)));
  }
}


// #define SENSORPINA A0 // x axis
//  //TODO: define other sensor inputs
// unsigned long targetTime=0;
// const unsigned long interval=2500; //TODO: How fast should we read
// void setup(){
// // TODO: begin the serial connection with a baudrate of 115200
// }


// void loop(){
// 	if(millis()>=targetTime){
// 		targetTime= millis()+interval;
// 		Serial.println(analogRead(SENSORPINA));

// 		 //TODO: Add other sensor read outs
//      //TODO: convert values into a string https://www.arduino.cc/en/Tutorial/StringConstructors
// 		 //TODO: combine them into a string that can be understood by server.js
// 		 //TODO: send the string over serial


// 	}
// 	// TODO: Detect if you want to reset the screen(shake the etch-a-sketch)
//   // TODO: write the reset message(see server.js) to the serial port

// }
