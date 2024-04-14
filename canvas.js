// let every file get the canvas context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// called every tick
function fillCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
fillCanvas();

export { ctx, canvas, fillCanvas };