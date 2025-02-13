/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var WALKER1_WIDTH = $("#walker").width();
  var WALKER1_HEIGHT = $("#walker").height();
  var WALKER2_WIDTH = $("#walker2").width();
  var WALKER2_HEIGHT = $("#walker2").height();
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    //gets rid of magic numbers when coding movement keys
    A: 65,
    D: 68,
    W: 87,
    S: 83,
  }
  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()
  const WALKER_SIZE = $("#walker").width();

  // Game Item Objects
  var walker = {
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0,
    //holds valus for walker
  }

  var walker2 = {
    xPos: BOARD_WIDTH - WALKER_SIZE,
    yPos: BOARD_HEIGHT - WALKER_SIZE,
    xSpeed: 0,
    ySpeed: 0,
    //holds valus for walker 2
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  
  $(document).on('keyup', handleKeyUp);                            // change 'eventType' to the type of event you want to handle
  //allows the handle key up and key down functions to activiate
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
    doCollide(walker, walker2);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      walker.xSpeed = -5
    }
    if (event.which === KEY.RIGHT){
      walker.xSpeed = 5
    }
    if (event.which === KEY.UP){
      walker.ySpeed = -5
    }
    if (event.which === KEY.DOWN){
      walker.ySpeed = 5
    }
    //moves the walkers when a key is pressed
    if (event.which === KEY.A){
      walker2.xSpeed = -5
    }
    if (event.which === KEY.D){
      walker2.xSpeed = 5
    }
    if (event.which === KEY.W){
      walker2.ySpeed = -5
    }
    if (event.which === KEY.S){
      walker2.ySpeed = 5
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.xSpeed = 0
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      walker.ySpeed = 0
    }
    //stops moving the walkers when a key is unpressed
    if (event.which === KEY.A || event.which === KEY.D){
      walker2.xSpeed = 0
    }
    if (event.which === KEY.W || event.which === KEY.S){
      walker2.ySpeed = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.xPos += walker.xSpeed
    walker.yPos += walker.ySpeed
    //change sthe position of the walkers
    walker2.xPos += walker2.xSpeed
    walker2.yPos += walker2.ySpeed
  }
  
  function redrawGameItem(){
    $("#walker").css("left", walker.xPos)
    $("#walker").css("top", walker.yPos)
    //actually redraws the walkers to make them move
    $("#walker2").css("left", walker2.xPos)
    $("#walker2").css("top", walker2.yPos)
  }

  function wallCollision(){
    if (walker.xPos > BOARD_WIDTH - WALKER_SIZE){
      walker.xPos -= walker.xSpeed;
    }
    if (walker.xPos < 0){
      walker.xPos -= walker.xSpeed;
    }
    if (walker.yPos > BOARD_HEIGHT - WALKER_SIZE){
      walker.yPos -= walker.ySpeed;
    }
    if (walker.yPos < 0){
      walker.yPos -= walker.ySpeed;
    }
    //prevents the walkers from hitting the border
    if (walker2.xPos > BOARD_WIDTH - WALKER_SIZE){
      walker2.xPos -= walker2.xSpeed;
    }
    if (walker2.xPos < 0){
      walker2.xPos -= walker2.xSpeed;
    }
    if (walker2.yPos > BOARD_HEIGHT - WALKER_SIZE){
      walker2.yPos -= walker2.ySpeed;
    }
    if (walker2.yPos < 0){
      walker2.yPos -= walker2.ySpeed;
    }
  }

  function doCollide(walker1, walker2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    walker1.x = walker1.xPos
    walker1.y = walker1.yPos
    walker1.leftX = walker1.x;
    walker1.topY = walker1.y;
    walker1.rightX = walker1.x + WALKER1_WIDTH;
    walker1.bottomY = walker1.y + WALKER1_HEIGHT;

    // TODO: Do the same for square2
    walker2.x = walker2.xPos
    walker2.y = walker2.yPos
    walker2.leftX = walker2.x;
    walker2.topY = walker2.y;
    walker2.rightX = walker2.x + WALKER2_WIDTH;
    walker2.bottomY = walker2.y + WALKER2_HEIGHT;

    // Returns true if they are overlapping, false otherwise
	  if (walker2.rightX > walker1.leftX &&
        walker2.bottomY > walker1.topY &&
        walker2.topY < walker1.bottomY &&
        walker2.leftX < walker1.rightX) {
      $("#walker").css("background-color", "rgb(255, 255, 255)")
      $("#walker2").css("background-color", "rgb(255, 255, 255)")
      $("#endMessage").text("Gotcha!")
    }
    else {
      console.log(false)
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
