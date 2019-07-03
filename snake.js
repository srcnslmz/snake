const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");

var snake = [ {x: 250, y: 250}, {x: 240, y: 250}, {x: 230, y: 250}, {x: 220, y: 250} ]

goSnake();

function goSnake() {
    createCanvas();
    generateFood();
    generateSnake();
}

function createCanvas() {
    context.fillStyle = "white";
    context.strokestyle = "black";

    context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function generateFood() {
    context.fillStyle = "red";
    context.strokestyle = "black";

    var foodX = (Math.round((Math.random() * (gameCanvas.width - 10) / 10) * 10));
    var foodY = (Math.round((Math.random() * (gameCanvas.height - 10) / 10) * 10));

    context.fillRect(foodX, foodY, 10, 10);
    context.strokeRect(foodX, foodY, 10, 10);
}

function generateSnake() {
    snake.forEach(drawSnake)
}

function drawSnake(snakePart) {
    context.fillStyle = "green";
    context.strokestyle = "black";

    context.fillRect(snakePart.x, snakePart.y, 10, 10);
    context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}