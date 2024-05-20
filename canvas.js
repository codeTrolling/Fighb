// let every file get the canvas context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var canvasWidth = 1200;
var canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let gameWrapper = document.getElementById("game-wrapper");
gameWrapper.style.height = canvasHeight + "px";
gameWrapper.style.width = canvasWidth + "px";

// called every tick
function fillCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
fillCanvas();

export { ctx, canvas, fillCanvas };