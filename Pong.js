//ball variables;
let xCircle = 300;
let yCircle = 200;
let diameter = 20;
let radius = diameter / 2;

//player variables;
let xPRect = 10;
let yPRect = 150;
let rectWidth = 10;
let rectHeight = 90;

//opponent variables;
let xORect = 580;
let yORect = 150;
let oRectSpeed;
let missChance = 0;

//ball speed variables;
let speedXCircle = 6;
let speedYCircle = 6;

//player speed variables;
let pRectSpeed = 10;

//score variables;
let playerScore = 0;
let opponentScore = 0;

//sound variables;
let soundtrack;
let score;
let hit;

//multiplayer;
let multiplayer = 0;

//library solution variable;
let collision = false;

function preload() {
  soundtrack = loadSound("trilha.mp3");
  score = loadSound("ponto.mp3");
  hit = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  showCircle();
  moveCircle();
  circleBorderCollision();
  showPlayerRectangle(xPRect, yPRect);
  showPlayerRectangle(xORect, yORect);
  movePlayerRectangle();
  borderMovementBlock();
  rectangleCollisionCheck();
  //collisionLibrary();
  opponentMovement();
  circleScreenCheck();
  collisionBug();
  showScore();
  scoreUp();
  missChanceCalc();
}

//funções da bolinha;
function showCircle() {
  circle(xCircle, yCircle, diameter);
}

function moveCircle() {
  xCircle += speedXCircle;
  yCircle += speedYCircle;
}

function circleBorderCollision() {
  if (xCircle + radius > width || xCircle - radius < 0) {
    speedXCircle *= -1;
    score.play();
  }
  if (yCircle + radius > height || yCircle - radius < 0) {
    speedYCircle *= -1;
  }
}

function circleScreenCheck() {
  if (xCircle < 0) {
    xCircle = 0 + radius;
  }
  if (xCircle > 600) {
    xCircle = 600 - radius;
  }
}

//funções da raquete;
function showPlayerRectangle(x, y) {
  rect(x, y, rectWidth, rectHeight);
}

function movePlayerRectangle() {
  if (keyIsDown(87)) {
    yPRect -= pRectSpeed;
  }
  if (keyIsDown(83)) {
    yPRect += pRectSpeed;
  }
}

function borderMovementBlock() {
  if (yPRect < 0) {
    yPRect = 0;
  }
  if (yPRect > 310) {
    yPRect = 310;
  }
}

function rectangleCollisionCheck() {
  if (
    xCircle - radius < xPRect + rectWidth &&
    yCircle - radius < yPRect + rectHeight &&
    yCircle + radius > yPRect
  ) {
    speedXCircle *= -1;
    hit.play();
  }
  if (
    xCircle + radius > xORect &&
    yCircle - radius < yORect + rectHeight &&
    yCircle + radius > yORect
  ) {
    speedXCircle *= -1;
    hit.play();
  }
}

function collisionBug() {
  if (
    xCircle - radius < xPRect + 8 &&
    yCircle - radius < yPRect + rectHeight &&
    yCircle + radius > yPRect
  ) {
    xCircle = 31;
  }
  if (
    xCircle + radius > xORect + 2 &&
    yCircle - radius < yORect + rectHeight &&
    yCircle + radius > yORect
  ) {
    xCircle = 569;
  }
}

function opponentMovement() {
  if (multiplayer < 1) {
    oRectSpeed = yCircle - yORect - rectHeight / 2 - 40;
    yORect += oRectSpeed - missChance;
  }
  if (multiplayer > 0) {
    if (keyIsDown(UP_ARROW)) {
      yORect -= pRectSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      yORect += pRectSpeed;
    }
  }
  if (yORect < 0) {
    yORect = 0;
  }
  if (yORect > 310) {
    yORect = 310;
  }
}

function missChanceCalc() {
  if (opponentScore >= playerScore) {
    missChance += 1;
    if (missChance >= 14) {
      missChance = 15;
    }
  } else {
    missChance -= 1;
    if (missChance <= 0) {
      missChance = 0;
    }
  }
}

//check de colisão da biblioteca;
function collisionLibrary() {
  collision = collideRectCircle(
    xPRect,
    yPRect,
    rectWidth,
    rectHeight,
    xCircle,
    yCircle,
    diameter
  );
  if (collision) {
    speedXCircle *= -1;
  }
}

//funções do placar;
function showScore() {
  stroke(255);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 25);
  rect(430, 10, 40, 25);
  textSize(20);
  fill(255);
  text(playerScore, 150, 30);
  text(opponentScore, 450, 30);
}

function scoreUp() {
  if (xCircle - radius < 1) {
    opponentScore += 1;
  }
  if (xCircle + radius > 599) {
    playerScore += 1;
  }
}

//funções multiplayer;
function keyTyped() {
  if (key === "m") {
    multiplayer = 1;
    console.log("multiplayer is on");
  }
  if (key === "n") {
    multiplayer = 0;
    console.log("multiplayer is off");
  }
}
