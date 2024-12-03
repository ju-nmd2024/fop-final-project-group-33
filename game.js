// Array for bricks
let bricks = [];

// Number of rows and columns for the bricks
let rows = 3;
let columns = 6;

// Variables for brick dimensions and spacing
let brickWidth;
let brickHeight = 30;
let spaceBetweenBricks = 10;
let spaceFromWall = 50;

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
    this.visible = true;    //All bricks are visible
  }

  draw() {
    fill(100, 100, 100);
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(800, 600);

<<<<<<< Updated upstream
  width = 800;
  height = 600;

=======
  console.log(width);
  console.log(height);
>>>>>>> Stashed changes

  brickWidth =
    (width - spaceFromWall * 2 - spaceBetweenBricks * (columns - 1)) /
    columns;

  // grid of bricks
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      // Calculate the x and y position for the current brick
      let x = spaceFromWall + column * (brickWidth + spaceBetweenBricks);
      let y = spaceFromWall + row * (brickHeight + spaceBetweenBricks);

      // Create a new Brick object at the calculated position
      bricks.push(new Brick(x, y));
    }
  }

  // Create paddle
  paddle = {
    x: width / 2 - paddleWidth / 2,   //Ensures the paddle starts centered horizontally in canvas
<<<<<<< Updated upstream
    y: height - 50,
=======
    y: height - 100,                  //Position of the paddle vertically
>>>>>>> Stashed changes
    width: paddleWidth,
    height: paddleHeight,
    speed: 10                          //Controls how fast the paddle moves
  }; 
      

  // Creat ball
  ball = {
<<<<<<< Updated upstream
    x: width / 2,     //Horizontal position. (in the center)
    y: height / 1.5,    //Vertical position. (in the center)
    dx: 5,            //Left and right movement speed. Positive mean to the right
    dy: -5,           //Up and down movement speed. Negative means upward
=======
    x: width - 200,     //Horizontal position. (in the center)
    y: height / 2,    //Vertical position. (in the center)
    dx: 3,            //Left and right movement speed. Positive mean to the right
    dy: -3,           //Up and down movement speed. Negative means upward
>>>>>>> Stashed changes
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


  console.log(width);
  console.log(height);

  //Move paddle
  if (keyIsDown(LEFT_ARROW) && paddle.x > spaceFromWall) {
    paddle.x -= paddle.speed;
  }
  if (keyIsDown(RIGHT_ARROW) && paddle.x < width - paddle.width - spaceFromWall) {
    paddle.x += paddle.speed;
  }

  //Draw paddle
  fill (255, 255, 255);
  rect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.height / 2);

  //Movement of the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

<<<<<<< Updated upstream
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
=======
  if(ball.x == spaceFromWall || ball.x == (width - spaceFromWall)) {
    ball.x = - ball.x;
    ball.y = ball.y;
  }

>>>>>>> Stashed changes
  
  //Draw ball
  fill(255, 0, 0);
  ellipse(ball.x, ball.y, ball.size);

  for (let brick of bricks) {
    if (brick.visible) {
      brick.draw();

      if (ball.x >= brick.x && ball.x <= brick.x + brick.width &&
        ball.y >= brick.y && ball.y <= brick.y + brick.height) {
          ball.dy *= -1;
          brick.visible = false;
        }
    }
  }
}
