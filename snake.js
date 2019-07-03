var gameCanvas = document.getElementById("gameCanvas");
var context = gameCanvas.getContext("2d");
var gameScore = 0;
var gameSpeed = 100;
var directionChange = false;
var foodCoordinateX;
var foodCoordinateY;
var snakeCoordinateX = 10;
var snakeCoordinateY = 0;
var snake = [ {x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150} ]

goSnake();
reGenerateFood()

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
        generateFood();
        generateSnake();
        goSnake();
    }, gameSpeed)
}

function generateCanvas() {
    context.fillStyle = "white";
    context.strokestyle = "black";

    context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function generateFood() {
    context.fillStyle = "black";
    context.strokestyle = "black";

    context.fillRect(foodCoordinateX, foodCoordinateY, 10, 10);
    context.strokeRect(foodCoordinateX, foodCoordinateY, 10, 10);
}

function reGenerateFood() {
    foodCoordinateX = Math.round((Math.random() * (gameCanvas.width)) / 10) * 10;
    foodCoordinateY = Math.round((Math.random() * (gameCanvas.height)) / 10) * 10;

    snake.forEach(function isFoodOnSnake(part) {
        if (part.x == foodCoordinateX && part.y == foodCoordinateY) {
            reGenerateFood();
        }
      });
}

function drawSnake(snakePart) {
    context.fillStyle = "black";
    context.strokestyle = "black";

    context.fillRect(snakePart.x, snakePart.y, 10, 10);
    context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function generateSnake() {
    var head = { x: snake[0].x + snakeCoordinateX, y: snake[0].y + snakeCoordinateY };
    snake.unshift(head);

    if (snake[0].x === foodCoordinateX && snake[0].y === foodCoordinateY) {
      gameScore += 1;
      document.getElementById('gameScore').innerHTML = gameScore;

      reGenerateFood();
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