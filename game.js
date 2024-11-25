// Array to store all bricks
let bricks = [];

// Number of rows and columns for the brick grid
let rows = 3;
let columns = 6;

// Variables for brick dimensions and spacing
let brickWidth;
let brickHeight = 30;
let spaceBetweenBricks = 10;
let spaceFromTopWall = 50;
let spaceFromLeftWall = 50;

// Brick class to represent each brick
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = brickWidth;
    this.height = brickHeight;
  }

  draw() {
    fill(100, 100, 100);
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(800, 600);

  brickWidth =
    (width - spaceFromLeftWall * 2 - spaceBetweenBricks * (columns - 1)) /
    columns;

  // grid of bricks
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      // Calculate the x and y position for the current brick
      let x = spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
      let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

      // Create a new Brick object at the calculated position
      bricks.push(new Brick(x, y));
    }
  }
}

function draw() {
  background(0, 0, 0);

  for (let brick of bricks) {
    brick.draw();
  }
}
