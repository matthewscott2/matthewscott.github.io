varX = 0;
varY = 0;

$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    // for (let i = 100; i < canvas.width; i += 100) {
    //   createPlatform(i, canvas.height, -1, -canvas.height);
    // }
    // for (let i = 100; i < canvas.height; i += 100) {
    //   createPlatform(canvas.width, i, -canvas.width, -1);
    // }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    createPlatform(varX+100,varY+625,200,10);
    createPlatform(varX+400,varY+625,1000,10);
    createPlatform(100,525,600,10);
    createPlatform(800,525,600,10);
    createPlatform(100,425,800,10);
    createPlatform(1000,425,400,10);
    createPlatform(100,325,200,10);
    createPlatform(400,325,1000,10);
    createPlatform(100,225,1200,10);
    createPlatform(100,125,600,10);
    createPlatform(800,125,600,10);

    //maze
    createPlatform(0,0,1400,10);
    createPlatform(100,0,10,625);
    createPlatform(0,0,10,1400);
    createPlatform(1390,0,10,1400);
    varX++;
    varY++;

    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable("red",400,550,0.5,1)
    createCollectable("orange",1100,450,0.5,1)
    createCollectable("yellow",400,350,0.5,1)
    createCollectable("green",150,250,0.5,1)
    createCollectable("blue",725,150,0.5,1)
    createCollectable("purple",580,50,0.5,1)
    


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("left",-35,2000);
    createCannon("right",240,1250);
    createCannon("right",440,1250);
    createCannon("left",525,1250);
    createCannon("top",750,1250);
    createCannon("bottom",750,1250);
    


    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
