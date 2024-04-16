var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {//creates all the enemies, obstacles, and collectibles in level one
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 600, y: groundY - 450 },
          { type: "sawblade", x: 800, y: groundY - 450},
          { type: "sawblade", x: 1000, y: groundY - 450 },
          { type: "reward", x: 2000, y: groundY - 60},
          { type: "enemy", x: 1000, y: groundY - 20},
          { type: "marker", x: 2100, y: groundY - 150},
          { type: "sawblade", x: 1500, y: groundY - 450 },
          { type: "sawblade", x: 1700, y: groundY - 450},
          { type: "sawblade", x: 1900, y: groundY - 450 },
        ],
      },
      {//creates all the enemies, obstacles, and collectibles in level two
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "cacti", x: 400, y: groundY - 450},
          { type: "cacti", x: 600, y: groundY - 450},
          { type: "cacti", x: 900, y: groundY - 450},
          { type: "tumbleweed", x: 1000, y: groundY - 450},
          { type: "carbonFiber", x: 2000, y: groundY - 75},
          { type: "armoredEnemy", x: 1000, y: groundY - 50},
          { type: "alien", x: 1700, y: groundY - 25},
          { type: "marker", x: 2100, y: groundY - 150},
          { type: "cacti", x: 1200, y: groundY - 450},
          { type: "cacti", x: 1400, y: groundY - 450},
          { type: "cacti", x: 1600, y: groundY - 450},
          { type: "tumbleweed", x: 1700, y: groundY - 450},
        ],
      },
      {//creates all the enemies, obstacles, and collectibles in level three
        name: "Robot Riot",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "cacti", x: 400, y: groundY - 450},
          { type: "cacti", x: 600, y: groundY - 450},
          { type: "cacti", x: 900, y: groundY - 450},
          { type: "tumbleweed", x: 1000, y: groundY - 450},
          { type: "rayGun", x: 2000, y: groundY - 75},
          { type: "rayGunAlien", x: 1800, y: groundY - 50},
          { type: "rayGunAlien", x: 2000, y: groundY - 50},
          { type: "cacti", x: 1200, y: groundY - 450},
          { type: "cacti", x: 1400, y: groundY - 450},
          { type: "cacti", x: 1600, y: groundY - 450},
          { type: "tumbleweed", x: 1700, y: groundY - 450},
          { type: "ufo", x: 1500, y: groundY - 250},
          { type: "ufo", x: 2100, y: groundY - 250},
          { type: "missionComplete", x: 2500, y: groundY - 200},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
