/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  
  // Game Item Objects
  const KEY = {
    "W": 87,
    "A": 65,
    "S": 83, 
    "D": 68,
    "UP": 38,
    "LEFT": 37,
    "DOWN": 40,
    "RIGHT": 39,
  }


  function GameItem(id, xSpeed, ySpeed){
    var objInstance = {
      id: id,
      xPos: parseFloat($(id).css("left")),
      yPos: parseFloat($(id).css("top")),
      xSpeed: xSpeed,
      ySpeed: ySpeed,
      width: $(id).width(),
      height: $(id).width(),
    }
    return objInstance
  }

  var paddleLeft = GameItem("#paddleLeft", 0, 0);
  var paddleRight = GameItem("#paddleRight", 0, 0)
  var ball = GameItem("#ball", randomNum, 0)

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem(paddleLeft);
    redrawGameItem(paddleRight);
    redrawGameItem(ball);
    updateGameItem(paddleLeft);
    updateGameItem(paddleRight);
    updateGameItem(ball);
    outOfBounds(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.ySpeed = -5
    }
    if(event.which === KEY.UP){
      paddleRight.ySpeed = -5
    }
    /*if(event.which === KEY.A){
      paddleLeft.xSpeed = -5
    }
    if(event.which === KEY.LEFT){
      paddleRight.xSpeed = -5
    }*/
    if(event.which === KEY.S){
      paddleLeft.ySpeed = 5
    }
    if(event.which === KEY.DOWN){
      paddleRight.ySpeed = 5
    }
    /*if(event.which === KEY.D){
      paddleLeft.xSpeed = 5
    }
    if(event.which === KEY.RIGHT){
      paddleRight.xSpeed = 5
    }*/
  }

  function handleKeyUp(event){
    if(event.which === KEY.W){
      paddleLeft.ySpeed = 0
    }
    if(event.which === KEY.UP){
      paddleRight.ySpeed = 0
    }
    if(event.which === KEY.S){
      paddleLeft.ySpeed = 0
    }
    if(event.which === KEY.DOWN){
      paddleRight.ySpeed = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  
  function redrawGameItem(obj){
    $(obj.id).css("left", obj.xPos);
    $(obj.id).css("top", obj.yPos);
  }

  function updateGameItem(obj){
    obj.xPos += obj.xSpeed;
    obj.yPos += obj.ySpeed;
  }

  //check boundaries of paddles
  //handle what happens when the ball hits the walls
  //handle what happens when the ball hits the paddles
  //handle what happens when someone wins
  //handle the points
  //handle resetting the game

  function outOfBounds(obj){
    if (obj.xPos > BOARD_WIDTH - obj.width){
      obj.xPos = BOARD_WIDTH/2 - obj.width/2
      //increase score1
    }
    if (obj.xPos < 0){
      obj.xPos = BOARD_WIDTH/2 - obj.width/2
      //increase score2
    }
    if (obj.yPos > BOARD_HEIGHT - obj.height){
      obj.yPos = 182.5
      //increase score1
    }
    if (obj.yPos < 0){
      obj.yPos = 182.5
      //increase score2
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
