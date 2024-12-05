// Sources we used for this game

//references

// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
// https://www.youtube.com/watch?v=-Yd94ZvDA6g
// https://editor.p5js.org/bansal321/sketches/HJAFXebeV
// https://www.youtube.com/watch?v=N3phCa6wJBQ

let x = 350;
let y = 200;

// Array for bricks
let bricks = [];

let gameState = "start"; // start, won, playing, lost

// Number of rows and columns for the bricks
let rows = 3;
let columns = 6;

// Variables for brick dimensions and spacing
let brickWidth;
let brickHeight = 50;
let spaceBetweenBricks = 10;
let spaceFromTopWall = 10;
let spaceFromLeftWall = 10;

// Variables for paddle and ball
let paddle;
let paddleWidth = 120;
let paddleHeight = 30;
let ball;
let ballSize = 15;
let ballReleased = false;

// for all images we used different AI
// https://gemini.google.com/share/continue/59c99b9e3320
function preload() {
  brickImage = loadImage("BrickC.png");
  paddleImage = loadImage("paddle.png");
  grinchImage = loadImage("Grinch (2).png");
  santaImage = loadImage("santa.png");
  santa2Image = loadImage("Happy_santa.png");
}

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
    image(brickImage, this.x, this.y, this.width, this.height);
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
    image(paddleImage, this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(800, 600);
  // https://loop.cloud.microsoft/p/eyJ1IjoiaHR0cHM6Ly9qb25rb3Bpbmd1bml2ZXJzaXR5LnNoYXJlcG9pbnQuY29tL2NvbnRlbnRzdG9yYWdlL3g4Rk5PLXh0c2t1Q1JYMl9mTVRITFlGTXNCdXQwLUZMbmowSnAzaFZTdWM%2FbmF2PWN6MGxNa1pqYjI1MFpXNTBjM1J2Y21GblpTVXlSbmc0Ums1UExYaDBjMnQxUTFKWU1sOW1UVlJJVEZsR1RYTkNkWFF3TFVaTWJtb3dTbkF6YUZaVGRXTW1aRDFpSlRJeFRtZ3pOVVpDYlhkVmF6WjRYelJQYzJObU9USlhjRlZWWjJsTloxZENSa1puZDFCS2VFaENaVlpSWkY5NlJrcG5RWHBqTVZRMWFrMXlOWGN4TFVsUFN5Wm1QVEF4UlZrM1IwdEpXalZJVGxCRlIwZEJTRVphU0ZsTFZscFdSazVYV1VkRE1sVW1ZejBsTWtZbWNEMGxOREJtYkhWcFpIZ2xNa1pzYjI5d0xYQmhaMlV0WTI5dWRHRnBibVZ5In0%3D

  // in the end garret help us and told us that p5 canvas have a glitch.
  width = 800;
  height = 600;

  brickWidth =
    (width - spaceFromLeftWall * 2 - spaceBetweenBricks * (columns - 1)) /
    columns; // https://www.youtube.com/watch?v=N3phCa6wJBQ

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
    width / 2 - paddleWidth / 2,
    height - 70,
    paddleWidth,
    paddleHeight,
    10
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
  // used from Esmaeil first game
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
  if (mouseIsPressed) {
    ballReleased = true;
  }
}

// Start screen of game
function startScreen() {
  push();
  stroke(155, 255, 255); // Buttons and game name
  strokeWeight(25);
  fill(255, 255, 255);

  textSize(120); // Game name
  text("BREAKOUT", x - 280, y - 10);
  image(santaImage, 300, 100);

  strokeWeight(5);
  textSize(40);
  text("CHOOSE A LEVEL", x - 280, y + 115);

  pop();

  push();

  strokeWeight(5); // EASY Button shape
  fill(255, 255, 255);
  rect(x - 225, y + 150, 170, 50, 20);

  stroke(155, 255, 255); // EASY Button text
  fill(0, 30, 65);
  textSize(30);
  text("EASY", x - 180, y + 185);

  pop();

  push();

  strokeWeight(5); // Medium Button shape
  fill(255, 255, 255);
  rect(x - 225, y + 230, 170, 50, 20);

  stroke(155, 255, 255); // Medium Button text
  fill(0, 30, 65);
  textSize(30);
  text("MEDIUM", x - 200, y + 265);

  pop();

  push();

  strokeWeight(5); // Hard Button shape
  fill(255, 255, 255);
  rect(x - 225, y + 310, 170, 50, 20);

  stroke(155, 255, 255); // Hard Button text
  fill(0, 30, 65);
  textSize(30);
  text("HARD", x - 180, y + 345);

  pop();
}

// Winning result screen
function resultScreenWin() {
  push();
  stroke(155, 255, 255);
  strokeWeight(15);
  fill(255, 255, 255);

  textSize(70); // winning game msg and santa image
  text("HO HO GOOD JOB !", x - 270, y - 50);
  image(santa2Image, 300, 100);

  strokeWeight(5); // button for next level
  fill(255, 255, 255);
  rect(x - 255, y + 200, 230, 50, 20);

  strokeWeight(5); // text of next level
  fill(0, 30, 65);
  textSize(30);
  text("NEXT level", x - 215, y + 235);
  pop();

  strokeWeight(5); // button for main menu
  stroke(155, 255, 255);
  textSize(40);
  fill(255, 255, 255);
  rect(x - 255, y + 280, 230, 50, 20);
  strokeWeight(5); // text for main menu
  fill(0, 30, 65);
  textSize(30);
  text("MAIN MENU", x - 225, y + 315);
}

// Winning result screen of last level
function resultScreen() {
  push();
  stroke(155, 255, 255); // winning game text
  strokeWeight(15);
  fill(255, 255, 255);

  textSize(70); //
  text("HO HO GOOD JOB !", x - 270, y - 50);
  image(santa2Image, 300, 100);

  strokeWeight(5); // button for main menu
  textSize(40);
  fill(255, 255, 255);
  rect(x - 55, y + 200, 230, 50, 20);

  strokeWeight(5); // main menu text
  fill(0, 30, 65);
  textSize(30);
  text("MAIN MENU", x - 25, y + 235);
  pop();
}

// Losing result screen
function resultScreenLose() {
  push();
  stroke(155, 255, 255);
  strokeWeight(15);
  fill(255, 255, 255);

  textSize(80); // Game over text
  text("GAME OVER", x - 250, y - 10);

  strokeWeight(5); // to play again text
  textSize(60);
  text("DO YOU WANT TO", x - 260, y + 150);

  // button for play again
  rect(x - 115, y + 200, 230, 50, 20);

  // Buttons text
  fill(0, 30, 65);
  textSize(30);
  text("PLAY AGAIN", x - 85, y + 235); // play again text
  image(grinchImage, x + 100, y - 65);
  pop();

  strokeWeight(5); // Button shape
  stroke(155, 255, 255);
  fill(255);
  rect(x - 115, y + 280, 230, 50, 20);

  fill(0, 30, 65);
  textSize(30);
  text("MAIN MENU", x - 85, y + 315);
}

// gradient background
function drawGradientBackground() {
  // https://www.youtube.com/watch?v=EAY7S1tWbzc
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

  if (gameState === "start") {
    startScreen();
  } else if (gameState === "playing") {
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
        ball.x <= paddle.x + paddle.width //&&
        // ball.y <= (paddle.x + paddle.width) + paddle.height
      ) {
        ball.dy = ball.dy * -1;
      }
    }

    // Draw ball
    fill(105, 250, 250);
    ellipse(ball.x, ball.y, ball.size);

    // Draw bricks
    let allBricksDestroyed = true;
    for (let brick of bricks) {
      if (brick.visible) {
        brick.draw();
        allBricksDestroyed = false; // when bricks are drawn "allBricksDestroyed" variable will becaome false.

        if (
          ball.x >= brick.x && // brick collision
          ball.x <= brick.x + brick.width &&
          ball.y >= brick.y &&
          ball.y <= brick.y + brick.height
        ) {
          ball.dy *= -1;
          brick.visible = false;
        }
      }
    }

    // Losing condition
    if (ball.y >= height) {
      gameState = "lost";
    }

    // Winning condition

    if (allBricksDestroyed) {
      // when all the bricks will disapper, "allBricksDestroyed" will be true and gamestate will benchanged to won.
      gameState = "won";
    }
  } else if (gameState === "lost") {
    resultScreenLose();
  } else if (gameState === "won") {
    resultScreenWin();
  }
}

function resetGame() {
  //Reset ball position
  ball.x = paddle.x + paddle.width / 2;
  ball.y = paddle.y - ball.size / 2;

  //Reset ball speed to default
  ball.dx = 5;
  ball.dy = -5;

  //Reset paddle position
  paddle.x = width / 2 - paddleWidth / 2;
  paddle.width = 120;

  //Reset bricks
  bricks = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      // Calculate the x and y position for the bricks
      let x = spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
      let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

      // Create a new Brick wall
      bricks.push(new Brick(x, y));
    }
  }
}

// Mouse click to start the game
function mousePressed() {
  if (gameState === "playing" && !ballReleased) {
    // ball will not release when gamestate will be playing until we click the mouse button
    ballReleased = true;
  }

  // start screen have three buttons. easy, medium and hard
  if (gameState === "start") {
    // Easy button
    if (mouseX > 120 && mouseX < 300 && mouseY > 345 && mouseY < 400) {
      gameState = "playing";
    }
    // Medium button
    else if (mouseX > 120 && mouseX < 300 && mouseY > 425 && mouseY < 485) {
      gameState = "playing";
      ball.dx = 7;
      ball.dy = -7;
      paddle.width = 90;
    }
    // Hard button
    else if (mouseX > 120 && mouseX < 300 && mouseY > 505 && mouseY < 565) {
      gameState = "playing";
      ball.dx = 9;
      ball.dy = -9;
      paddle.width = 60;
      paddle.speed = 12;
    }

    // if you lost easy level and click on play again you can play easy mode again
  } else if (gameState === "lost" && paddle.width === 120) {
    if (mouseX > 235 && mouseX < 465 && mouseY > 400 && mouseY < 450) {
      gameState = "playing";
      ballReleased = false;
      resetGame();

      bricks = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          // Calculate the x and y position for the bricks
          let x =
            spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
          let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

          // Create a new Brick wall
          bricks.push(new Brick(x, y));
        }
      }
    } else if (mouseX > 235 && mouseX < 465 && mouseY > 480 && mouseY < 530) {
      // button for the main menu
      gameState = "start";
      ballReleased = false;
      resetGame();
    }

    // if you won easy level. by clicking button next level you will go to medium level
  } else if (gameState === "won" && paddle.width === 120) {
    if (mouseX > 95 && mouseX < 325 && mouseY > 400 && mouseY < 450) {
      gameState = "playing";
      ballReleased = false;
      ball.dx = 8;
      ball.dy = -8;
      paddle.width = 90;
      paddle.x = width / 2 - paddleWidth / 2;

      bricks = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          // Calculate the x and y position for the current brick
          let x =
            spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
          let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

          // Create a new Brick object at the calculated position
          bricks.push(new Brick(x, y));
        }
      }
    } else if (mouseX > 95 && mouseX < 325 && mouseY > 480 && mouseY < 530) {
      // button for the main menu
      gameState = "start";
      ballReleased = false;
      resetGame();
    }

    // if you lost medium mode and click plick gain you can play agin medium level
  } else if (gameState === "lost" && paddle.width === 90) {
    if (mouseX > 235 && mouseX < 465 && mouseY > 400 && mouseY < 450) {
      gameState = "playing";
      ballReleased = false;
      ball.dx = 8;
      ball.dy = -8;
      paddle.width = 90;
      paddle.x = width / 2 - paddleWidth / 2;

      bricks = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          // Calculate the x and y position for the bricks
          let x =
            spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
          let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

          // Create a new Brick wall
          bricks.push(new Brick(x, y));
        }
      }
    } else if (mouseX > 235 && mouseX < 465 && mouseY > 480 && mouseY < 530) {
      // button for the main menu
      gameState = "start";
      ballReleased = false;
      resetGame();
    }
    // if you won medium mode and click next level you will go to hard level
  } else if (gameState === "won" && paddle.width === 90) {
    if (mouseX > 95 && mouseX < 325 && mouseY > 400 && mouseY < 450) {
      gameState = "playing";
      ballReleased = false;
      ball.dx = 11;
      ball.dy = -11;
      paddle.width = 60;
      paddle.x = width / 2 - paddleWidth / 2;

      bricks = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          // Calculate the x and y position for the bricks
          let x =
            spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
          let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

          // Create a new Brick wall
          bricks.push(new Brick(x, y));
        }
      }
    } else if (mouseX > 95 && mouseX < 325 && mouseY > 480 && mouseY < 530) {
      // button for the main menu
      gameState = "start";
      ballReleased = false;
      resetGame();
    }

    // if you lost hard mode and click play again you can play  again hard level
  } else if (gameState === "lost" && paddle.width === 60) {
    if (mouseX > 235 && mouseX < 465 && mouseY > 400 && mouseY < 450) {
      gameState = "playing";
      ballReleased = false;
      ball.dx = 11;
      ball.dy = -11;
      paddle.width = 60;
      paddle.x = width / 2 - paddleWidth / 2;

      bricks = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          // Calculate the x and y position for the bricks
          let x =
            spaceFromLeftWall + column * (brickWidth + spaceBetweenBricks);
          let y = spaceFromTopWall + row * (brickHeight + spaceBetweenBricks);

          // Create a new Brick wall
          bricks.push(new Brick(x, y));
        }
      }
    } else if (mouseX > 235 && mouseX < 465 && mouseY > 480 && mouseY < 530) {
      // button for the main menu
      gameState = "start";
      ballReleased = false;
      resetGame();
    }
    // if you won hard mode and click main menu you will go to main menu
  } else if (gameState === "won" && paddle.width === 60) {
    if (mouseX > 95 && mouseX < 325 && mouseY > 400 && mouseY < 450) {
      // button for the main menu
      gameState = "start";
      ballReleased = false;
      resetGame();
    }
  }
}
