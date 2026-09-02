const canvas = document.getElementById('scratchpad');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const settingsBtn = document.getElementById('settingsBtn');

// 1. Make the canvas fill the whole screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Call it once to set initial size

// 2. Setup drawing variables
let isDrawing = false;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 4; // Thickness of the line

// 3. Mouse Events
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return; // Stop if mouse isn't clicked
  
  ctx.strokeStyle = colorPicker.value; // Get color from the color wheel
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// 4. Settings Button Alert (Just a placeholder for now!)
settingsBtn.addEventListener('click', () => {
  alert("Settings menu coming soon! You could add line thickness or an eraser here.");
});
