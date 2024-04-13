// let every file get the canvas context.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

export { ctx, canvas };