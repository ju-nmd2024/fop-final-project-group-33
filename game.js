
// Array for bricks
let bricks = [];

// Number of rows and columns for the bricks
let rows = 3;
let columns = 6;

// Variables for brick dimensions and spacing
let brickWidth;
let brickHeight = 30;
let spaceBetweenBricks = 10;
let spaceFromTopWall = 10;
let spaceFromLeftWall = 10;

// Variables for paddle and ball
let paddle;
let paddleWidth = 100;
let paddleHeight = 20;
let ball;
let ballSize = 15;
let ballReleased = false;

// Brick class to represent each brick
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = brickWidth;
    this.height = brickHeight;
    this.visible = true; // All bricks are visible
  }

  draw() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }
}

// Paddle class to represent the paddle
class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  move(direction) {
    this.x += direction * this.speed;
  }

  draw() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height, this.height / 2);
  }
}

function setup() {
  createCanvas(800, 600);

  width = 800;
  height = 600;

  brickWidth =
    (width - spaceFromLeftWall * 2 - spaceBetweenBricks * (columns - 1)) /
    columns;

  // Grid of bricks
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
  paddle = new Paddle(
    width / 2 - paddleWidth / 2, // Ensures the paddle starts centered horizontally in canvas
    height - 70,
    paddleWidth,
    paddleHeight,
    8 // Controls how fast the paddle moves
  );

  // Create ball
  ball = {
    x: paddle.x + paddle.width / 2, // Center of paddle
    y: paddle.y - ballSize / 2, // Top of paddle
    dx: 5, // Left and right movement speed. Positive means to the right
    dy: -5, // Up and down movement speed. Negative means upward
    size: ballSize,
  };
}

// Drawing the starfield
function starfield() {
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

function mousePressed() {
  // Release the ball when the mouse is clicked
  ballReleased = true;
}

function startScreen() {
  push();
  stroke(155, 255, 255); // Buttons and game name
  strokeWeight(25);
  fill(255, 255, 255);

  textSize(100); // Game name
  text("BREAKOUT", x - 270, y - 10);

  strokeWeight(5); // Level Button shape
  rect(x - 85, y + 100, 160, 50, 20);

  noStroke(); // Level text
  fill(0, 30, 65);
  textSize(30);
  text("LEVELS", x - 60, y + 135);

  pop();

  push();

  strokeWeight(5); // EASY Button shape
  rect(x - 275, y + 200, 170, 50, 20);

  noStroke(); // EASY Button text
  fill(0, 30, 65);
  textSize(30);
  text("EASY", x - 230, y + 235);

  pop();

  push();

  strokeWeight(5); // Medium Button shape
  rect(x - 85, y + 200, 170, 50, 20);

  noStroke(); // Medium Button text
  fill(0, 30, 65);
  textSize(30);
  text("MEDIUM", x - 60, y + 235);

  pop();

  push();

  strokeWeight(5); // Hard Button shape
  rect(x + 105, y + 200, 170, 50, 20);

  noStroke(); // Hard Button text
  fill(0, 30, 65);
  textSize(30);
  text("HARD", x + 150, y + 235);

  pop();
}

// Winning result screen
function resultScreenWin() {
  push();
  stroke(155, 255, 255); // Buttons and game name
  strokeWeight(15);
  fill(255, 255, 255);

  textSize(90); // Game name
  text("GOOD JOB !", x - 250, y - 10);

  strokeWeight(5);
  textSize(60);
  text("FOR NEXT LEVEL", x - 240, y + 150);

  strokeWeight(5); // Button shape
  rect(x - 115, y + 200, 230, 50, 20);

  noStroke(); // Buttons texts
  fill(0, 30, 65);
  textSize(30);
  text("CLICK HERE", x - 85, y + 235);
  pop();
}

// Losing result screen
function resultScreenLose() {
  push();
  stroke(155, 255, 255); // Buttons and game name
  strokeWeight(15);
  fill(255, 255, 255);

  textSize(80); // Game name
  text("GAME OVER", x - 250, y - 10);

  strokeWeight(5);
  textSize(60);
  text("DO YOU WANT TO", x - 260, y + 150);

  strokeWeight(5); // Button shape
  rect(x - 115, y + 200, 230, 50, 20);

  noStroke(); // Buttons texts
  fill(0, 30, 65);
  textSize(30);
  text("PLAY AGAIN", x - 85, y + 235);
  pop();
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color("#001F3F"), color("#0077BE"), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function draw() {
  drawGradientBackground();
  starfield();

  // Move paddle
  if (keyIsDown(LEFT_ARROW) && paddle.x > 0) {
    paddle.move(-1);
  }
  if (keyIsDown(RIGHT_ARROW) && paddle.x < width - paddle.width) {
    paddle.move(1);
  }

  // Draw paddle
  paddle.draw();

  if (!ballReleased) {
    // Keep ball attached to the paddle if not released
    ball.x = paddle.x + paddle.width / 2;
    ball.y = paddle.y - ball.size / 2;
  } else {
    // Movement of the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // When ball hits side walls
    if (ball.x - ball.size / 2 <= 0 || ball.x + ball.size / 2 >= width) {
      ball.dx = ball.dx * -1; // Reverse horizontal direction
    }

    // When ball hits the top wall
    if (ball.y - ball.size / 2 <= 0) {
      ball.dy = ball.dy * -1; // Reverse vertical direction
    }

    // When ball hits paddle
    if (
      ball.y + ball.size / 2 >= paddle.y &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width
    ) {
      ball.dy = ball.dy * -1;
    }
  }

  // Draw ball
  fill(105, 250, 250);
  ellipse(ball.x, ball.y, ball.size);

  for (let brick of bricks) {
    if (brick.visible) {
      brick.draw();

      if (
        ball.x >= brick.x &&
        ball.x <= brick.x + brick.width &&
        ball.y >= brick.y &&
        ball.y <= brick.y + brick.height
      ) {
        ball.dy *= -1;
        brick.visible = false;
      }
    }
  }
}