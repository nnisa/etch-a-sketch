var COLOR =  '#505050';  // This is the drawing color
var radius = 3;           // Constant radio for the line
var socket = io();        // websocket to the server
var previousPosition=[0,0]; // previous position to draw a line from
var ctx = Sketch.create(); //Creating the drawing context
var firstMessage=true;    // What the first message, to start on the first value


//////////////////////////////////////////////////////////////////////////////////
//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//////////////////////////////////////////////////////////////////////////////////


    ctx.container = document.getElementById( 'container' ); //reference drawing canvas
    ctx.autoclear= false; // making sure it stays
    ctx.retina='auto';
    ctx.setup = function() { console.log( 'setup' );} // Setup all variables
    ctx.keydown= function() { if ( ctx.keys.C ) ctx.clear();} // handeling keydowns

    socket.on('reset', function() { // on a 'reset' message clean and reste firstMessage
      firstMessage=true;
      ctx.clear();
    });
//////////////////////////////////////////////////////////////////////////////////

    socket.on('width', function() {
        radius = Math.floor(Math.random()*10+1);
        console.log( 'width clicked' )
    });
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////

    socket.on('color', function() {
        COLOR = getRandomColor();
        console.log( 'color clicked' )
    });
//////////////////////////////////////////////////////////////////////////////////


socket.on('new-pos', function(newPosition) { // handling new sensor values
  if (newPosition[0] <= ctx.width && newPosition[1] <= ctx.height) {
      console.log( 'new position' )
      if(firstMessage){ // if its the first message store that value as previous
        firstMessage=false;
        previousPosition=newPosition;
      }
      else{ // any other message we use to draw.
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = ctx.strokeStyle = COLOUR;
        ctx.lineWidth = radius;
        ctx.beginPath();  //begin a adrawing
        ctx.moveTo( previousPosition[0], previousPosition[1] ); // from
        ctx.lineTo( newPosition[0],  newPosition[1]); // to
        ctx.stroke(); // and only draw a stroke
        previousPosition=newPosition; // update to the new position.
      }
   }
});

