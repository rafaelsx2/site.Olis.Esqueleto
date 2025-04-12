const canvas = document.getElementById("skeleton_draw");
const ctx = canvas.getContext("2d");
const colors = document.getElementById("colorselector");
const brushes = document.getElementById("brushes")
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");

//aumenta resolução
canvas.width = 120;
canvas.height = 170;
ctx.scale(1, 1);

let drawing = false;
let currentColor = colors.value;
let currentSize = parseInt(brushes.value);
let isErasing = false;

function getPointerPos(evt) {
  const rect = canvas.getBoundingClientRect();
  if (evt.touches) {
    return {
      x: evt.touches[0].clientX - rect.left,
      y: evt.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: evt.offsetX,
      y: evt.offsetY
    };
  }
}

function startDraw(evt) {
  drawing = true;
  const pos = getPointerPos(evt);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  evt.preventDefault();
}

function draw(evt) {
  if (!drawing) return;
  const pos = getPointerPos(evt);
  ctx.strokeStyle = isErasing ? '#b3e0f2' : currentColor;
  ctx.lineWidth = currentSize;
  ctx.lineCap = 'round';
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  evt.preventDefault();
}

function endDraw() {
  drawing = false;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseout", endDraw);

canvas.addEventListener("touchstart", startDraw, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", endDraw);

colors.addEventListener("input", () => {
  currentColor = colors.value;
  isErasing = false;
});

brushes.addEventListener("change", () => {
  currentSize = parseInt(brushes.value);
});

eraser.addEventListener("click", () => {
  isErasing = true;
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});