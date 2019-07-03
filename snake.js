const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");
        
goSnake();

function goSnake() {
    createCanvas();
}

function createCanvas() {
    context.fillStyle = "white";
    context.strokestyle = "black";
    context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}