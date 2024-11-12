const canvas = document.getElementById("myCanva");
const ctx = canvas.getContext("2d");

const circle = { x: 100, y: canvas.height / 2, radius: 50, color: getRandomColor(), borderColor: 'black', borderWidth: 3 };
const arrow = { x: canvas.width - 100, y: canvas.height / 2, speed: 5, length: 50, shaftWidth: 8, headSize: 20 };
let shape = "circle"; 

const backgroundColors = ["#f0f0f0", "#333333", "#87CEEB", "#FFC0CB"];
let bgColorIndex = 0; 
canvas.style.backgroundColor = backgroundColors[bgColorIndex];


function drawInitialScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape();
    drawArrow();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawShape() {
    ctx.fillStyle = circle.color;
    ctx.strokeStyle = circle.borderColor;
    ctx.lineWidth = circle.borderWidth;

    if (shape === "circle") {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (shape === "square") {
        ctx.beginPath();
        ctx.rect(circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);
        ctx.fill();
        ctx.stroke();
    } else if (shape === "triangle") {
        ctx.beginPath();
        ctx.moveTo(circle.x, circle.y - circle.radius);
        ctx.lineTo(circle.x - circle.radius, circle.y + circle.radius);
        ctx.lineTo(circle.x + circle.radius, circle.y + circle.radius);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

function drawArrow() {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = arrow.shaftWidth;

    ctx.beginPath();
    ctx.moveTo(arrow.x - arrow.length, arrow.y); 
    ctx.lineTo(arrow.x - arrow.length + arrow.headSize, arrow.y - arrow.headSize / 2); 
    ctx.lineTo(arrow.x - arrow.length + arrow.headSize, arrow.y + arrow.headSize / 2); 
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(arrow.x - arrow.length + arrow.headSize, arrow.y);
    ctx.lineTo(arrow.x, arrow.y);
    ctx.stroke();
}

function moveArrow() {
    const interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawInitialScene();
        arrow.x -= arrow.speed;

        if (arrow.x - arrow.length <= circle.x + circle.radius) {
            clearInterval(interval);
            circle.color = getRandomColor(); 
            drawInitialScene();
        }
    }, 30);
}

function resetCanvas() {
    arrow.x = canvas.width - 100;
    circle.color = getRandomColor();
    shape="circle";
    canvas.style.backgroundColor="#f0f0f0";
    drawInitialScene();
}

function changeBgColor() {
    bgColorIndex = (bgColorIndex + 1) % backgroundColors.length;
    canvas.style.backgroundColor = backgroundColors[bgColorIndex];
}

function changeShape() {
    const shapes = ["circle", "square", "triangle"];
    shape = shapes[Math.floor(Math.random() * shapes.length)];
    circle.color = getRandomColor(); 
    drawInitialScene();
}
drawInitialScene();

document.getElementById("moveArrowbtn").addEventListener("click",moveArrow);
document.getElementById("resetCanvabtn").addEventListener("click",resetCanvas);
document.getElementById("changeShapebtn").addEventListener("click", changeShape);
document.getElementById("toggleBgBtn").addEventListener("click", changeBgColor);