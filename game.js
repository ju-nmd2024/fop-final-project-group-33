// Array for bricks
let bricks = [];

// Number of rows and columns for the bricks
let rows = 3;
let columns = 6;

// Variables for brick dimensions and spacing
let brickWidth;
let brickHeight = 30;
let spaceBetweenBricks = 10;
let spaceFromTopWall = 50;
let spaceFromLeftWall = 50;

// Variables for paddle and ball
let paddle;
let paddleWidth = 100;
let paddleHeight = 20;
let ball;
let ballSize = 15;

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

  width = 800;
  height = 600;


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

  // Create paddle
  paddle = {
    x: width / 2 - paddleWidth / 2,   //Ensures the paddle starts centered horizontally in canvas
    y: height - 100,
    width: paddleWidth,
    height: paddleHeight,
    speed: 5            //Controls how fast the paddle moves
  }; 
      

  // Creat ball
  ball = {
    x: width / 2,     //Horizontal position. (in the center)
    y: height / 1.5,    //Vertical position. (in the center)
    dx: 5,            //Left and right movement speed. Positive mean to the right
    dy: -5,           //Up and down movement speed. Negative means upward
    size: ballSize
  };
  
}

//Drawing the starfield
function starfield(){
  push();
  let x1 = random(width);
  let y1 = random(height);
  let sizeStar = random(1, 5);
  let brightness = random(150, 255);
  stroke(brightness);
  strokeWeight(sizeStar);
  point(x1, y1);
  pop();
}

function draw() {
  background(0, 0, 0);
  starfield();

  //Move paddle
  if (keyIsDown(LEFT_ARROW) && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }
  if (keyIsDown(RIGHT_ARROW) && paddle.x < width - paddle.width) {
    paddle.x += paddle.speed;
  }

  //Draw paddle
  fill (255, 255, 255);
  rect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.height / 2);

  //Movement of the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // When ball hits side walls

  if (ball.x - ball.size / 2 <= 0 || ball.x + ball.size / 2 >= width) {
    ball.dx = ball.dx * -1; // Reverse horizontal direction
  }

  // when ball hits the top wall
  if (ball.y - ball.size / 2 <= 0) {
    ball.dy = ball.dy * -1; // Reverse vertical direction
  }

  // when ball hits paddle
  if (
    ball.y + ball.size / 2 >= paddle.y &&           
    ball.x >= paddle.x &&                           
    ball.x <= paddle.x + paddle.width               
  ) {
    ball.dy = ball.dy * -1; 
  }
  
  //Draw ball
  fill(255, 0, 0);
  ellipse(ball.x, ball.y, ball.size);

  for (let brick of bricks) {
    brick.draw();
  }
}
