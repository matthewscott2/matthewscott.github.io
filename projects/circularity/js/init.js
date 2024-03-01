var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //holds a circle
        var circles = []; //stores all circles

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2); //draws the circle in the canvas in a random place, at a random size, and in a rnadom color, using an existing function 
            physikz.addRandomVelocity(circle, canvas); //gives the circle its velocity using the physikz library
            view.addChild(circle); //allows the circle to appear on the screen by adding it as a child of view
            circles.push(circle); //adds the circle to the array "circles"
        }      

        // TODO 3 / 7 : Call the drawCircle() function
        for (var loops = 0; loops <= 100; loops++){ //creates a loop that repeats 100 times
            drawCircle(); //draws a circle 100 times
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.

            // TODO 8 / 9 : Iterate over the array
           for (var i = 0; i < circles.length; i++){ //creates a loop that repeats as many times as the array "circles" has values, in this case 100.
             physikz.updatePosition(circles[i]) //updates the value of the position of the circle
             game.checkCirclePosition(circles[i]) //finds the circle's position
           }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            var rightEdge = circle.x + circle.radius; //creates a variable for the right edge of the circle
            var leftEdge = circle.x - circle.radius; //creates a variable for the left edge of the circle
            var topEdge = circle.y - circle.radius; //creates a variable for the top edge of the circle
            var bottomEdge = circle.y + circle.radius; //creates a variable for the bottom edge of the circle

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( leftEdge > canvas.width ) {
                circle.x = 0 - circle.radius; //sets the x position of the circle to slightly below zero so the circle smoothly transitions from right to left
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            
            if ( topEdge > canvas.height ) {
                circle.y = 0 - circle.radius; //sets the y position of the circle to slightly below zero so the circle smoothly transitions from the bottom to the top
            }
            if ( rightEdge < 0 ) {
                circle.x = canvas.width + circle.radius; //sets the x position of the circle to slightly to the right of the convas so the circle smoothly transitions from left to right
            }
            if ( bottomEdge < 0) {
                circle.y = canvas.height + circle.radius; //sets the y position of the circle to slightly below the canvas so the circle smoothly transitions from the top to the bottom
            }

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
