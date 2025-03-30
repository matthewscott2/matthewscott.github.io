/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width(); //finds the width of the board using jQuery
  const BOARD_HEIGHT = $("#board").height(); //finds the height of the board using jQuery
  const randomNum = (Math.random() * 3 + 3) * (Math.random() > 0.5 ? -1 : 1); //generates a random number to be used for the stating speed of the ball
  
  // Game Item Objects
  const KEY = { //sets the value for certain keys to be used in keybaord event functions such as movement
    "W": 87,
    "A": 65,
    "S": 83, 
    "D": 68,
    "UP": 38,
    "LEFT": 37,
    "DOWN": 40,
    "RIGHT": 39,
  }

  var score1 = 0 //creates the base value for score one
  var score2 = 0 //creates the base value for score two
  var startMessage = "To begin the game, slide both paddles to the top of the screen." //sets the message to be displayed when the game is first loaded
  var gameMessage = "Good luck, have fun!" //sets the message to be displayed while the game is being played

  $("#score1").text(score1) //displays score one at the beginning of the game
  $("#score2").text(score2) //displays score two at the beginning of the game
  $("#textBox").text(startMessage) //displays the start message at the beginning of the game

  function GameItem(id, xSpeed, ySpeed){ //a reusable function that creates all the game objects with changeable values
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

  var paddleLeft = GameItem("#paddleLeft", 0, 0); //creates the left paddle with its starting values
  var paddleRight = GameItem("#paddleRight", 0, 0); //creates the right paddle with its starting values
  var ball = GameItem("#ball", 0, 0); //creates the ball with its starting values

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  //calls the handleKeyDown function everytime a key is pressed, allows for certain keys to have certain actions                      
  $(document).on('keyup', handleKeyUp);  //calls the handleKeyUp function everytime a key is released, allows for certain keys to have certain actions

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
    detectCollision(ball, paddleLeft, paddleRight);
    wallCollision(ball);
    paddleBoundaries(paddleLeft);
    paddleBoundaries(paddleRight);
    winScenarios(score1, score2, "one", "two");
    winScenarios(score2, score1, "two", "one");
  } //calls all of the game's functions every frame (allows for animation)
  
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
    if(event.which === KEY.S){
      paddleLeft.ySpeed = 7.5
    }
    if(event.which === KEY.DOWN){
      paddleRight.ySpeed = 7.5
    } //moves the paddle up or down depending on what key was pressed, w and s for the left paddle and up and down for the right paddle
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
    } //stops moving the paddle up or down depending on what key was released, w and s for the left paddle and up and down for the right paddle
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  
  function redrawGameItem(obj){
    $(obj.id).css("left", obj.xPos);
    $(obj.id).css("top", obj.yPos);
  } //visibly moves the game items

  function updateGameItem(obj){
    obj.xPos += obj.xSpeed;
    obj.yPos += obj.ySpeed;
  } //changes they value of the game item's positions

  //gameplay helpers

  function startGame(){
    if (paddleLeft.yPos <= 0 && paddleRight.yPos <= 0 && ball.xSpeed === 0){
      ball.xSpeed = randomNum
      ball.ySpeed = randomNum
      paddleLeft.yPos = BOARD_HEIGHT/2 - paddleLeft.height/2
      paddleRight.yPos = BOARD_HEIGHT/2 - paddleRight.height/2
      $("#textBox").text(gameMessage)
    } //sets the ball's speed to a random value at the start of the match, and moves the paddles to the middle of the screen.
      //also updates the game message displayed at the bottom of the screen, and only starts the game when both paddles move to the top of the board
  }

  function outOfBounds(obj){
    if (obj.xPos > BOARD_WIDTH - obj.width){
      obj.xPos = BOARD_WIDTH/2 - obj.width/2
      obj.xSpeed = randomNum
      obj.ySpeed = randomNum
      score2 += 1
      $("#score2").text(score2)
    } //handles what happens when an object, the ball, goes out of bounds on the right side: updates the score, resets the board, etc.

    if (obj.xPos < 0){
      obj.xPos = BOARD_WIDTH/2 - obj.width/2
      obj.xSpeed = randomNum
      obj.ySpeed = randomNum
      score1 += 1
      $("#score1").text(score1)
    }  //handles what happens when an object, the ball, goes out of bounds on the left side: updates the score, resets the board, etc.
  }

  function detectCollision(ball, paddleOne, paddleTwo){
    if (ball.xPos < paddleOne.xPos + paddleOne.width && 
      paddleOne.yPos + paddleOne.height/2 > ball.yPos && 
      paddleOne.yPos + paddleOne.height/2 < ball.yPos + ball.height){
      ball.xSpeed = -ball.xSpeed + 0.5
    } //makes the ball bounce back in the oposite direction when it hits the left paddle

    if (ball.xPos + ball.width > paddleTwo.xPos && 
      paddleTwo.yPos + paddleTwo.height/2 > ball.yPos && 
      paddleTwo.yPos + paddleTwo.height/2 < ball.yPos + ball.height){
      ball.xSpeed = -ball.xSpeed - 0.5
    } //makes the ball bounce back in the oposite direction when it hits the right paddle
  }

  function wallCollision(ball){
    if (ball.yPos < 0){
      ball.ySpeed = -ball.ySpeed
    } //makes the ball bounce back down if it hits the top of the board

    if (ball.yPos > BOARD_HEIGHT - ball.height){
      ball.ySpeed = -ball.ySpeed
    } //makes the ball bounce back up if it hits the bottom of the board
  }

  function paddleBoundaries(paddle){
    if (paddle.yPos > BOARD_HEIGHT - paddle.height){
      paddle.yPos = BOARD_HEIGHT - paddle.height;
    } //ensures the paddles don't go out of the bottom of the board, and makes them stop moving

    if (paddle.yPos < 0){
      paddle.yPos = 0;
    } //ensures the paddles don't go out of the top of the board, and makes them stop moving
  }

  function winScenarios(winnerScore, loserScore, winner, loser){
    if(winnerScore === 7 && loserScore === 0){
      gameMessage = "Flawless victory, player " + winner + "."
      $("#textBox").text(gameMessage)
      endGame();
    } //handles what to do if one player wins by 7 points: updates the game message and ends the game

    if((winnerScore === 7 && loserScore === 1) || (winnerScore === 7 && loserScore === 2) || (winnerScore === 7 && loserScore === 3)) {
      gameMessage = "Devastating defeat, player " + loser + "."
      $("#textBox").text(gameMessage)
      endGame();
    } //handles what to do if one player wins by 5-6 points: updates the game message and ends the game

    if((winnerScore === 7 && loserScore === 4) || (winnerScore === 7 && loserScore === 5)){
      gameMessage = "Well-earned win, player " + winner + "."
      $("#textBox").text(gameMessage)
      endGame();
    } //handles what to do if one player wins by 2-4 points: updates the game message and ends the game

    if(winnerScore === 7 && loserScore === 6){
      gameMessage = "Hard-fought victory, player " + winner + "."
      $("#textBox").text(gameMessage)
      endGame();
    } //handles what to do if one player wins by 1 point: updates the game message and ends the game
  }

  function endGame() {

    $("#ball").css('opacity', 0)
    $("#paddleLeft").css('opacity', 0)
    $("#paddleRight").css('opacity', 0)
    $("#endGameButton").css('opacity', 1)
    //hides all the game objects and shows the restart button, which reloads the game
    //called after a player has won

    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
   
  }   
}
