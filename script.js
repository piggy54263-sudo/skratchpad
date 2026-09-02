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
resizeCanvas(); // Call once to set initial size

// 2. Setup drawing variables
let isDrawing = false;

// 3. Helper function to get exact X and Y for both mouse AND touch
function getCoordinates(e) {
  if (e.touches && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

// 4. Drawing Functions
function startDrawing(e) {
  isDrawing = true;
  const coords = getCoordinates(e);
  
  // Set brush styles here so they update if you change colors
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 4;
  ctx.strokeStyle = colorPicker.value;

  ctx.beginPath();
  ctx.moveTo(coords.x, coords.y);
  
  // Draw a tiny dot immediately on click
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
}

function draw(e) {
  if (!isDrawing) return; // Stop if mouse/finger isn't held down
  
  const coords = getCoordinates(e);
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

// 5. Mouse Events (Desktop)
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing); // Stops drawing if mouse leaves screen

// 6. Touch Events (Phones, Tablets, Touch-screens)
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevents the screen from scrolling while you draw
  startDrawing(e);
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e);
}, { passive: false });

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// 7. Settings Button
settingsBtn.addEventListener('click', () => {
  alert("Settings menu coming soon! You could add line thickness or an eraser here.");
});
