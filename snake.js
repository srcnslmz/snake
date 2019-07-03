const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");

goSnake();

function goSnake() {
    createCanvas();
    generateFood();
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