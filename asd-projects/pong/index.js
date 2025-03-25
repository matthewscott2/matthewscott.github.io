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
  const randomNum = (Math.random() * 3 + 3) * (Math.random() > 0.5 ? -1 : 1);
  
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

  var score1 = 0
  var score2 = 0
  var startMessage = "To begin the game, slide both paddles to the top of the screen."
  var gameMessage = "Good luck, have fun!"

  $("#score1").text(score1)
  $("#score2").text(score2)
  $("#textBox").text(startMessage)

  function GameItem(id, xSpeed, ySpeed){
    var objInstance = {
      id: id,
      xPos: parseFloat($(id).css("left")),
      yPos: parseFloat($(id).css("top")),
      xSpeed: xSpeed,
      ySpeed: ySpeed,
      width: $(id).width(),
      height: $(id).height(),
    }
    return objInstance
  }

  var paddleLeft = GameItem("#paddleLeft", 0, 0);
  var paddleRight = GameItem("#paddleRight", 0, 0)
  var ball = GameItem("#ball", 0, 0)

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
    startGame();
    redrawGameItem(paddleLeft);
    redrawGameItem(paddleRight);
    redrawGameItem(ball);
    updateGameItem(paddleLeft);
    updateGameItem(paddleRight);
    updateGameItem(ball);
    outOfBounds(ball);
    detectCollision();
    wallCollision();
    winScenarios();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.ySpeed = -7.5
    }
    if(event.which === KEY.UP){
      paddleRight.ySpeed = -7.5
    }
    /*if(event.which === KEY.A){
      paddleLeft.xSpeed = -5
    }
    if(event.which === KEY.LEFT){
      paddleRight.xSpeed = -5
    }*/
    if(event.which === KEY.S){
      paddleLeft.ySpeed = 7.5
    }
    if(event.which === KEY.DOWN){
      paddleRight.ySpeed = 7.5
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
  //handle what happens when the ball hits the paddles
  //handle what happens when someone wins
  //handle the points
  //handle resetting the game

function startGame(){
  if (paddleLeft.yPos <= 0 && paddleRight.yPos <= 0 && ball.xSpeed === 0){
    ball.xSpeed = randomNum
    ball.ySpeed = randomNum
    paddleLeft.yPos = BOARD_HEIGHT/2 - paddleLeft.height/2
    paddleRight.yPos = BOARD_HEIGHT/2 - paddleRight.height/2
    $("#textBox").text(gameMessage)
  }
}

  function outOfBounds(obj){
    if (obj.xPos > BOARD_WIDTH - obj.width){
      obj.xPos = BOARD_WIDTH/2 - obj.width/2
      obj.xSpeed = randomNum
      obj.ySpeed = randomNum
      score2 += 1
      $("#score2").text(score2)
      //increase score2
    }
    if (obj.xPos < 0){
      obj.xPos = BOARD_WIDTH/2 - obj.width/2
      obj.xSpeed = randomNum
      obj.ySpeed = randomNum
      score1 += 1
      $("#score1").text(score1)
      //increase score1
    }
  }

  function detectCollision(){
    if (ball.xPos < paddleLeft.xPos + paddleLeft.width && 
      paddleLeft.yPos + paddleLeft.height/2 > ball.yPos && 
      paddleLeft.yPos + paddleLeft.height/2 < ball.yPos + ball.height){
      ball.xSpeed = -ball.xSpeed + 0.5
    }
    if (ball.xPos + ball.width > paddleRight.xPos && 
      paddleRight.yPos + paddleRight.height/2 > ball.yPos && 
      paddleRight.yPos + paddleRight.height/2 < ball.yPos + ball.height){
      ball.xSpeed = -ball.xSpeed - 0.5
    }
  }

  function wallCollision(){
    if (ball.yPos < 0){
      ball.ySpeed = -ball.ySpeed
    }
    if (ball.yPos > BOARD_HEIGHT - ball.height){
      ball.ySpeed = -ball.ySpeed
    }
  }

  function winScenarios(){
    if(score1 === 7 && score2 === 0){
      gameMessage = "Flawless victory, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score1 === 7 && score2 === 1) {
      gameMessage = "Devastating defeat, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score1 === 7 && score2 === 2) {
      gameMessage = "Devastating defeat, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score1 === 7 && score2 === 3) {
      gameMessage = "Devastating defeat, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score1 === 7 && score2 === 4){
      gameMessage = "Well-earned win, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score1 === 7 && score2 === 5){
      gameMessage = "Well-earned win, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score1 === 7 && score2 === 6){
      gameMessage = "Hard-fought victory, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    

    if(score2 === 7 && score1 === 0){
      gameMessage = "Flawless victory, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score2 === 7 && score1 === 1) {
      gameMessage = "Devastating defeat, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score2 === 7 && score1 === 2) {
      gameMessage = "Devastating defeat, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score2 === 7 && score1 === 3) {
      gameMessage = "Devastating defeat, player one."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score2 === 7 && score1 === 4){
      gameMessage = "Well-earned win, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score2 === 7 && score1 === 5){
      gameMessage = "Well-earned win, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
    if(score2 === 7 && score1 === 6){
      gameMessage = "Hard-fought victory, player two."
      $("#textBox").text(gameMessage)
      endGame();
    }
  }

  function endGame() {

    $("#ball").css('opacity', 0)
    $("#paddleLeft").css('opacity', 0)
    $("#paddleRight").css('opacity', 0)
    $("#endGameButton").css('opacity', 1)
    //restartGame();

    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
   
  }

  function restartGame(){
    //$("#endGameButton").onClick('onClick', window.location.reload)
  }
  
}
