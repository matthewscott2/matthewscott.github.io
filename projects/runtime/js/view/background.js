var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var trees = [];
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'darkBlue'); //sets the background to a dark blue sky
            background.addChild(backgroundFill); //adds the background I created as a child of the background, allowing it to be seen
            
            // TODO 2: - Add a moon and starfield

            for (var stars = 0; stars < 100; stars++) { //limits the amount of stars that can be drawn to 100
                var circle = draw.circle(3, "white", "LightGray", 2) //creates the star
                circle.x = canvasWidth * Math.random(); //sets the x-position of the star to a random spot
                circle.y = groundY * Math.random(); //sets the y position of the star to a random spot
                background.addChild(circle) //adds the stars as a child of background, allowing them to be seen
            }
            
            var moon =draw.bitmap("img/moon.png"); //creates the moon
            moon.x = -150 //defines the x-position of the moon
            moon.y = -150 //defines the y-position of the moon
            moon.scaleX = 0.9; //makes the moon slightly smaller horizontally 
            moon.scaleY = 0.9; //makes the moon slightly smaller vertically
            background.addChild(moon) //adds the moon as a child of background, allowing it to be seen

            // TODO 4: Part 1 - Add cacti!     Q: This is before TODO 4 for a reason! Why?
            
            for (var i = 0; i < 10; ++i) { //sets the number of cacti to 10
                var buildingHeight = 300 * Math.random(); //cretes a random cactus height
                var building = draw.bitmap("img/cactus.png");  //creates the cacti
                building.x = 400 * i * Math.random(); //sets the x postion of the cacti to a random spot
                building.y = groundY - 135; //sets the y-position of the cacti to right above the ground
                background.addChild(building); //adds the cacti as a child of background, allowing them to be seen
                buildings.push(building); //adds the cacti to the array "buildings"
                }
            
            // TODO 3: Part 1 - Add a cloud
        
            for (var i = 0; i < 5; ++i) { //sets the number of clouds to 5
                var tree = draw.bitmap("img/cloud.png"); //creates the cloud
                tree.x = canvas.width * Math.random();  //sets the x-position of the cloud to a random spot
                tree.y = 100 * Math.random() - 150; //sets the y-position of the ckoud to a random spot in the sky
                background.addChild(tree); //adds the cloud as a child of background, allowing it to be seen
                trees.push(tree); //adds the cloud to the array "trees"
            }

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){ //creates a loop that goes through all of the cacti in the array
                buildings[i].x--; //moves the cacti to the left
                if (buildings[i].x < -200){ 
                    buildings[i].x = canvasWidth; //makes the cacti reappear on the right side of the screen after going off on the left
                }
            }
            for (var i = 0; i < trees.length; i++){ //creates a loop that goes through all of the clouds in the array
                trees[i].x--; //moves the clouds to the left
                if (trees[i].x < -450){
                    trees[i].x = canvasWidth; //makes the clouds reappear on the right side of the screen after going off on the left
                }
            }


        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
