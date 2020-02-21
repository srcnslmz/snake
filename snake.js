var gameCanvas = document.getElementById("gameCanvas");
var context = gameCanvas.getContext("2d");
var gameScore = 0;
var gameSpeed = 100;
var foodSpeed = 100;
var directionChange = false;
var foodCoordinateX;
var foodCoordinateY;
var snakeCoordinateX = 10;
var snakeCoordinateY = 0;
var snake = [ {x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150} ]

goSnake();
createFood();

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (directionChange) {
        return;
    }

    directionChange = true;
    var keyPressed = event.keyCode;
    var leftArrow = 37;
    var upArrow = 38;
    var rightArrow = 39;
    var downArrow = 40;
    var goLeft = snakeCoordinateX === -10;
    var goUp = snakeCoordinateY === -10;
    var goRight = snakeCoordinateX === 10;
    var goDown = snakeCoordinateY === 10;

    if (keyPressed === leftArrow && !goRight) {
      snakeCoordinateX = -10;
      snakeCoordinateY = 0;
    }

    if (keyPressed === upArrow && !goDown) {
      snakeCoordinateX = 0;
      snakeCoordinateY = -10;
    }

    if (keyPressed === rightArrow && !goLeft) {
      snakeCoordinateX = 10;
      snakeCoordinateY = 0;
    }

    if (keyPressed === downArrow && !goUp) {
      snakeCoordinateX = 0;
      snakeCoordinateY = 10;
    }
}

function goSnake() {
    if (IsGameFinish()) {
        return;
    }

    setTimeout(function onTick() {
        directionChange = false;
        generateCanvas();
        generateSnake();
        goSnake();
    }, gameSpeed)

    setTimeout(function onTick() {
      generateFood();
  }, foodSpeed)
}

function generateCanvas() {
    drawItem("white", "black", 0, 0, gameCanvas.width, gameCanvas.height);
}

function generateFood() {
    drawItem("red", "red", foodCoordinateX, foodCoordinateY, 10, 10);
}

function createFood() {
    foodCoordinateX = Math.round((Math.random() * (gameCanvas.width)) / 10) * 10;
    foodCoordinateY = Math.round((Math.random() * (gameCanvas.height)) / 10) * 10;

    snake.forEach(function isFoodOnSnake(part) {
        if (part.x == foodCoordinateX && part.y == foodCoordinateY) {
          createFood();
        }
      });
}

function drawSnake(snakePart) {
    drawItem("green", "green", snakePart.x, snakePart.y, 10, 10);
}

function drawItem(fillColor, strokeColor, coordinateX, coordinateY, width, height) {
  context.fillStyle = fillColor;
  context.strokestyle = strokeColor;

  context.fillRect(coordinateX, coordinateY, width, height);
  context.strokeRect(coordinateX, coordinateY, width, height);
}

function generateSnake() {
    var head = { x: snake[0].x + snakeCoordinateX, y: snake[0].y + snakeCoordinateY };
    snake.unshift(head);

    if (snake[0].x === foodCoordinateX && snake[0].y === foodCoordinateY) {
      gameScore += 1;
      document.getElementById('gameScore').innerHTML = gameScore;

      createFood();
    } 
    else {
      snake.pop();
    }

    snake.forEach(drawSnake)
}

function IsGameFinish() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
          return true;
        }
    }

    return ((snake[0].x < 0) || (snake[0].x > gameCanvas.width - 10) || (snake[0].y < 0) || (snake[0].y > gameCanvas.height - 10));
 }
