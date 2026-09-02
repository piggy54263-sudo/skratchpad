const canvas = document.getElementById('scratchpad');
const ctx = canvas.getContext('2d');
const colorBtn = document.getElementById('colorBtn');
const colorPicker = document.getElementById('colorPicker');
const eraserBtn = document.getElementById('eraserBtn');
const settingsBtn = document.getElementById('settingsBtn');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

let isDrawing = false;
let currentTool = 'brush'; 
let currentColor = colorPicker.value;

// Tool Selection Logic
function setActiveTool(tool) {
  currentTool = tool;
  document.querySelectorAll('.icon-button').forEach(btn => btn.classList.remove('active'));
  
  if (tool === 'brush') {
    colorBtn.classList.add('active');
  } else if (tool === 'eraser') {
    eraserBtn.classList.add('active');
  }
}

setActiveTool('brush');

colorBtn.addEventListener('click', () => setActiveTool('brush'));
colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  if (currentTool === 'brush') setActiveTool('brush');
});
eraserBtn.addEventListener('click', () => setActiveTool('eraser'));
settingsBtn.addEventListener('click', () => alert("Settings menu coming up next!"));

// Drawing Logic
function getCoordinates(e) {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

function startDrawing(e) {
  isDrawing = true;
  const coords = getCoordinates(e);
  ctx.beginPath();
  ctx.moveTo(coords.x, coords.y);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  if (currentTool === 'eraser') {
    ctx.strokeStyle = '#000000'; // Matches background
    ctx.lineWidth = 20; 
  } else {
    ctx.strokeStyle = currentColor; 
    ctx.lineWidth = 4; 
  }

  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
}

function draw(e) {
  if (!isDrawing) return;
  const coords = getCoordinates(e);
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

// THE MISSING EVENT LISTENERS!
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startDrawing(e);
}, { passive: false });
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e);
}, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);
