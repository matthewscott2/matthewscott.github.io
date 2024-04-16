var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
      function createCactus(sawX, sawY){ //a function that creates the cacti at a certain x and y value
        var hitZoneSize = 25; //determines how large of a hitbox the cacti have
        var damageFromObstacle = 100; //instantly kills the player upon contact
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone
        sawBladeHitZone.x = sawX; //determines where the hitzone is on the x-axis
        sawBladeHitZone.y = groundY - sawY; //determines where the hitzone is on the y-axis
        game.addGameItem(sawBladeHitZone); //adds the cactus as a game item
        var obstacleImage = draw.bitmap("img/cactus.png"); //creates the cacti
        sawBladeHitZone.addChild(obstacleImage); //adds the cacti as a child of the hitbox
        obstacleImage.x = - 100; //determines where the cacti is on the x-axis in relation to the hitbox
        obstacleImage.y = - 100; //determines where the cacti is on the y-axis in relation to the hitbox
        sawBladeHitZone.scaleX = 0.75; //makes the cacti smaller horizontally
        sawBladeHitZone.scaleY = 0.75; //makes the cacti smaller vertically
      }

      function createCacti(sawX, sawY){ //a function that creates the cacti at a certain x and y value
        var hitZoneSize = 25; //determines how large of a hitbox the cacti have
        var damageFromObstacle = 100; //instantly kills the player upon contact
        var cacti = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone
        cacti.x = sawX; //determines where the hitzone is on the x-axis
        cacti.y = groundY - sawY; //determines where the hitzone is on the y-axis
        game.addGameItem(cacti); //adds the cactus as a game item
        var obstacleImage = draw.bitmap("img/cacti.png"); //creates the cacti
        cacti.addChild(obstacleImage); //adds the cacti as a child of the hitbox
        obstacleImage.x = - 100; //determines where the cacti is on the x-axis in relation to the hitbox
        obstacleImage.y = - 100; //determines where the cacti is on the y-axis in relation to the hitbox
        cacti.scaleX = 0.75; //makes the cacti smaller horizontally
        cacti.scaleY = 0.75; //makes the cacti smaller vertically
      }
      function createTumbleweed(sawX, sawY){ //a function that creates the tumbleweed at a certain x and y value
        var hitZoneSize = 25; //determines how large of a hitbox the tumbleweed have
        var damageFromObstacle = 100; //instantly kills the player upon contact
        var tumbleweed = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone
        tumbleweed.x = sawX; //determines where the hitzone is on the x-axis
        tumbleweed.y = groundY - sawY; //determines where the hitzone is on the y-axis
        game.addGameItem(tumbleweed); //adds the cactus as a game item
        var obstacleImage = draw.bitmap("img/tumbleweed.png"); //creates the tumbleweed
        tumbleweed.addChild(obstacleImage); //adds the tumbleweed as a child of the hitbox
        obstacleImage.x = - 100; //determines where the tumbleweed is on the x-axis in relation to the hitbox
        obstacleImage.y = - 100; //determines where the tumbleweed is on the y-axis in relation to the hitbox
        tumbleweed.scaleX = 0.25; //makes the tumbleweed smaller horizontally
        tumbleweed.scaleY = 0.25; //makes the tumbleweed smaller vertically
        tumbleweed.velocityX = -5; //moves the tumbleweed
      }

      function createUfo(sawX, sawY){ //a function that creates the ufo at a certain x and y value
        var hitZoneSize = 25; //determines how large of a hitbox the ufo have
        var damageFromObstacle = 100; //instantly kills the player upon contact
        var ufo = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone
        ufo.x = sawX; //determines where the hitzone is on the x-axis
        ufo.y = groundY - sawY; //determines where the hitzone is on the y-axis
        game.addGameItem(ufo); //adds the cactus as a game item
        var obstacleImage = draw.bitmap("img/ufo.png"); //creates the ufo
        ufo.addChild(obstacleImage); //adds the ufo as a child of the hitbox
        obstacleImage.x = - 100; //determines where the ufo is on the x-axis in relation to the hitbox
        obstacleImage.y = - 100; //determines where the ufo is on the y-axis in relation to the hitbox
        ufo.scaleX = 1.5; //makes the ufo smaller horizontally
        ufo.scaleY = 1.5; //makes the ufo smaller vertically
        ufo.velocityX = -3.5; //moves the UFO
      }


      function createEnemy(x, y){ //a function that creates a cockroach at a certain x and y value
        var enemy = game.createGameItem("enemy", 25); //defines enemy as a game item called "enemy" 
        var redSquare = draw.bitmap("img/cockroach.png"); //creates the cockroach
        redSquare.scaleX = 0.25; //makes the cockroach much smaller horizontally
        redSquare.scaleY = 0.25; //makes the cockroach much smaller vertically
        redSquare.x = -25; //sets the x-position of the enemy based on the center of the enemy
        redSquare.y = -25; //sets the y-position of the enemy based on the center of the enemy
        enemy.addChild(redSquare); //allows the cockroach to be seen
        enemy.x = x; //sets the x-position of the enemy
        enemy.y = y; //sets the y-position of the enemy
        game.addGameItem(enemy); //adds the enemy to the game
        enemy.velocityX = -1.25; //makes the enemy move

        enemy.onPlayerCollision = function () {
          game.changeIntegrity(-100); //kills the player if they hit the enemy
        };

        enemy.onProjectileCollision = function () {
          game.increaseScore(100); //give the player score if they kill the enemy
          enemy.shrink(); //make sthe enemy dissapear
        };
      }

      function createArmoredEnemy(x, y){ //a function that creates an armored cockroach at a certain x and y value
        var armoredEnemy = game.createGameItem("armoredEnemy", 25); //defines enemy as a game item called "enemy" 
        var redSquare = draw.bitmap("img/armoredcockroach.png"); //creates the cockroach
        redSquare.scaleX = 0.2; //makes the cockroach much smaller horizontally
        redSquare.scaleY = 0.2; //makes the cockroach much smaller vertically
        redSquare.x = -25; //sets the x-position of the enemy based on the center of the enemy
        redSquare.y = -25; //sets the y-position of the enemy based on the center of the enemy
        armoredEnemy.addChild(redSquare); //allows the cockroach to be seen
        armoredEnemy.x = x; //sets the x-position of the enemy
        armoredEnemy.y = y; //sets the y-position of the enemy
        game.addGameItem(armoredEnemy); //adds the enemy to the game
        armoredEnemy.velocityX = -1.25; //makes the enemy move

        armoredEnemy.onPlayerCollision = function () {
          game.changeIntegrity(-100); //kills the player if they hit the enemy
        };

        armoredEnemy.onProjectileCollision = function () {
          game.increaseScore(100); //give the player score if they kill the enemy
          armoredEnemy.shrink(); //make sthe enemy dissapear
        };
      }

      function createAlien(x, y){ //a function that creates an alien at a certain x and y value
        var alien = game.createGameItem("alien", 25); //defines enemy as a game item called "enemy" 
        var redSquare = draw.bitmap("img/alien.png"); //creates the alien
        redSquare.scaleX = 0.25; //makes the alien much smaller horizontally
        redSquare.scaleY = 0.25; //makes the alien much smaller vertically
        redSquare.x = -25; //sets the x-position of the enemy based on the center of the enemy
        redSquare.y = -75; //sets the y-position of the enemy based on the center of the enemy
        alien.addChild(redSquare); //allows the alien to be seen
        alien.x = x; //sets the x-position of the enemy
        alien.y = y; //sets the y-position of the enemy
        game.addGameItem(alien); //adds the enemy to the game
        alien.velocityX = -1.5; //makes the enemy move

        alien.onPlayerCollision = function () {
          game.changeIntegrity(-100); //kills the player if they hit the enemy
        };

        alien.onProjectileCollision = function () {
          game.increaseScore(250); //gives the player score if they kill the enemy
          alien.shrink(); //make sthe enemy dissapear
        };
      }

      function createRayGunAlien(x, y){ //a function that creates an rayGunAlien at a certain x and y value
        var rayGunAlien = game.createGameItem("rayGunAlien", 25); //defines enemy as a game item called "enemy" 
        var redSquare = draw.bitmap("img/rayGunAlien.png"); //creates the rayGunAlien
        redSquare.scaleX = 0.5; //makes the rayGunAlien much smaller horizontally
        redSquare.scaleY = 0.5; //makes the rayGunAlien much smaller vertically
        redSquare.x = -120; //sets the x-position of the enemy based on the center of the enemy
        redSquare.y = -120; //sets the y-position of the enemy based on the center of the enemy
        rayGunAlien.addChild(redSquare); //allows the rayGunAlien to be seen
        rayGunAlien.x = x; //sets the x-position of the enemy
        rayGunAlien.y = y; //sets the y-position of the enemy
        game.addGameItem(rayGunAlien); //adds the enemy to the game
        rayGunAlien.velocityX = -2; //makes the enemy move

        rayGunAlien.onPlayerCollision = function () {
          game.changeIntegrity(-100); //kills the player if they hit the enemy
        };

        rayGunAlien.onProjectileCollision = function () {
          game.increaseScore(500); //give the player score if they kill the enemy
          rayGunAlien.shrink(); //make sthe enemy dissapear
        };
      }

      function createReward(x, y){ //a function that creates a battery as a reward for the player to collect
        var reward = game.createGameItem("reward", 25); //adds the reward as a game item
        var greenSquare = draw.bitmap("img/battery.png"); //creates the battery
        greenSquare.x = - 50; //sets the x-position of the battery based on the hitbox
        greenSquare.y = - 50; //sets the y-position of the battery based on the hitbox
        reward.addChild(greenSquare); //allows the battery to be seen
        reward.x = x; //sets the x-position of the hitbox
        reward.y = y -50; //sets the y-position of the hitbox
        game.addGameItem(reward); //adds the battery to the game
        reward.velocityX = - 2.5; //moves the battery
        greenSquare.scaleX = 0.4; //makes the battery smaller horizontally
        greenSquare.scaleY = 0.4; //makes the battery smaller vertically
        
        
        reward.onPlayerCollision = function () {
          game.increaseScore(100); //gives the player 100 score upon touching the battery
          reward.shrink(); //makes the battery disappear after being collected
        };
      }

      function createCarbonFiber(x, y){ //a function that creates a carbon fiber as a reward for the player to collect
        var carbonFiber = game.createGameItem("carbonFiber", 25); //adds the reward as a game item
        var greenSquare = draw.bitmap("img/carbonFiber.png"); //creates the carbon fiber
        greenSquare.x = - 50; //sets the x-position of the carbon fiber based on the hitbox
        greenSquare.y = - 50; //sets the y-position of the carbon fiber based on the hitbox
        carbonFiber.addChild(greenSquare); //allows the carbon fiber to be seen
        carbonFiber.x = x; //sets the x-position of the hitbox
        carbonFiber.y = y -50; //sets the y-position of the hitbox
        game.addGameItem(carbonFiber); //adds the carbon fiber to the game
        carbonFiber.velocityX = - 2.5; //moves the carbon fiber
        greenSquare.scaleX = 0.2; //makes the carbon fiber smaller horizontally
        greenSquare.scaleY = 0.2; //makes the carbon fiber smaller vertically
        
        
        carbonFiber.onPlayerCollision = function () {
          game.increaseScore(250); //gives the player 100 score upon touching the carbon fiber
          carbonFiber.shrink(); //makes the carbon fiber disappear after being collected
        };
      }

      function createRayGun(x, y){ //a function that creates a raygun as a reward for the player to collect
        var raygun = game.createGameItem("raygun", 25); //adds the reward as a game item
        var greenSquare = draw.bitmap("img/raygun.png"); //creates the raygun
        greenSquare.x = - 50; //sets the x-position of the raygun based on the hitbox
        greenSquare.y = - 50; //sets the y-position of the raygun based on the hitbox
        raygun.addChild(greenSquare); //allows the raygun to be seen
        raygun.x = x; //sets the x-position of the hitbox
        raygun.y = y -50; //sets the y-position of the hitbox
        game.addGameItem(raygun); //adds the raygun to the game
        raygun.velocityX = - 2.5; //moves the raygun
        greenSquare.scaleX = 0.2; //makes the raygun smaller horizontally
        greenSquare.scaleY = 0.2; //makes the raygun fiber smaller vertically
        
        
        raygun.onPlayerCollision = function () {
          game.increaseScore(500); //gives the player 100 score upon touching the raygun
          raygun.shrink(); //makes the raygun disappear after being collected
        };
      }

      function createMarker(x, y){ //a fucntion that creates an ender pearl to progress to the next level
        var marker = game.createGameItem("marker", 25); //creates the marker as a game item
        var yellowSquare = draw.bitmap("img/pearl.png"); //creates the ender pearl
        yellowSquare.x = -25; //sets the x-position of the pearl based on the hitbox
        yellowSquare.y = -25; //sets the y-position of the pearl based on the hitbox
        marker.addChild(yellowSquare); //allows the ender pearl to be seen
        marker.x = x; //sets the x-position of the hitbox
        marker.y = y; //sets the y-position of the htibox
        game.addGameItem(marker); //adds the pearl to the game
        marker.velocityX = -2.2; //moves the pearl
        yellowSquare.scaleX = 0.15; //makes the pearl much smaller horizontally
        yellowSquare.scaleY = 0.15; //makes the pearl much smaller vertically

        marker.onPlayerCollision = function () {
          startLevel(); //starts the next level upon touching the pearl
          marker.shrink(); //makes the pearl disappear upon being touched
        };
      }

      function createMissionComplete(x, y){ //a fucntion that creates an ender pearl to progress to the next level
        var missionComplete = game.createGameItem("missionComplete", 25); //creates the mission complete marker as a game item
        var yellowSquare = draw.bitmap("img/missionComplete.png"); //creates the mission complete marker
        yellowSquare.x = -50; //sets the x-position of the mission complete marker based on the hitbox
        yellowSquare.y = -500; //sets the y-position of the mission complete marker based on the hitbox
        missionComplete.addChild(yellowSquare); //allows the mission complete marker to be seen
        missionComplete.x = x; //sets the x-position of the hitbox
        missionComplete.y = y; //sets the y-position of the htibox
        game.addGameItem(missionComplete); //adds the mission complete marker to the game
        missionComplete.velocityX = -1; //moves the mission complete marker
        yellowSquare.scaleX = 2; //makes the mission complete marker much smaller horizontally
        yellowSquare.scaleY = 2; //makes the mission complete marker much smaller vertically
      }


    function startLevel() { //starts the next level
      // TODO 13 goes below here
     var level = levelData[currentLevel]; //defines the current level
     var levelObjects = level.gameItems; //defines the items on the screen
     for (i = 0; i < levelObjects.length; i++){ //iterates over all values of the levelObjects array
      var element = levelObjects[i]; //allows iteration to occur
      if (element.type === "sawblade"){
        createCactus(element.x, element.y); //creates cacti
      }
      if (element.type === "cacti"){
        createCacti(element.x, element.y); //creates lots of cacti
      }
      if (element.type === "tumbleweed"){
        createTumbleweed(element.x, element.y); //creates tumbleweeds
      }
      if (element.type === "enemy"){
        createEnemy(element.x, element.y); //creates cockroaches
      }
      if (element.type === "armoredEnemy"){
        createArmoredEnemy(element.x, element.y); //creates armored cockroaches
      }
      if (element.type === "alien"){
        createAlien(element.x, element.y); //creates aliens
      }
      if (element.type === "rayGunAlien"){
        createRayGunAlien(element.x, element.y); //creates raygun aliens
      }
      if (element.type === "ufo"){
        createUfo(element.x, element.y); //creates UFOs
      }
      if (element.type === "reward"){
        createReward(element.x, element.y); //creates batteries
      }
      if (element.type === "carbonFiber"){
        createCarbonFiber(element.x, element.y); //creates carbon fiber
      }
      if (element.type === "raygun"){
        createRayGun(element.x, element.y); //creates rayguns
      }
      if (element.type === "marker"){
        createMarker(element.x, element.y); //creates pearls
      }
      if (element.type === "missionComplete"){
        createMissionComplete(element.x, element.y); //creates the mission complete marker
      }
     }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
