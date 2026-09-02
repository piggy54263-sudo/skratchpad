// ...Previous canvas setup, resizeCanvas(), and getCoordinates() remain the same...

const canvas = document.getElementById('scratchpad');
const ctx = canvas.getContext('2d');
const colorBtn = document.getElementById('colorBtn');
const colorPicker = document.getElementById('colorPicker');
const eraserBtn = document.getElementById('eraserBtn');
const settingsBtn = document.getElementById('settingsBtn');

let isDrawing = false;
let currentTool = 'brush'; // Options: 'brush' or 'eraser'
let currentColor = colorPicker.value;

// 1. Tool Selection Logic (Activate/Deactivate buttons)
function setActiveTool(tool) {
  currentTool = tool;
  
  // Remove 'active' class from all buttons
  document.querySelectorAll('.icon-button').forEach(btn => btn.classList.remove('active'));
  
  if (tool === 'brush') {
    colorBtn.classList.add('active'); // Highlight the palette when brush is active
  } else if (tool === 'eraser') {
    eraserBtn.classList.add('active'); // Highlight the eraser
  }
}

// Initial state: brush is active
setActiveTool('brush');

// 2. Button Listeners
colorBtn.addEventListener('click', () => {
  setActiveTool('brush');
});

// Update current color when the user picks from the wheel
colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  if (currentTool === 'brush') setActiveTool('brush'); // Ensure brush is active if color changes
});

eraserBtn.addEventListener('click', () => {
  setActiveTool('eraser');
});

settingsBtn.addEventListener('click', () => {
  // Now that we have the eraser, update this placeholder
  alert("Settings: We can add brush size sliders here next!");
});


// 3. Drawing Logic
function startDrawing(e) {
  isDrawing = true;
  const coords = getCoordinates(e);
  ctx.beginPath();
  ctx.moveTo(coords.x, coords.y);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  
  // *** KEY ERASER LOGIC ***
  if (currentTool === 'eraser') {
    ctx.strokeStyle = '#000000'; // Erase with the background color
    ctx.lineWidth = 15; // Make the eraser wider than the default brush
  } else {
    ctx.strokeStyle = currentColor; // Draw with the chosen color
    ctx.lineWidth = 4; // Reset brush width
  }

  // Draw initial dot immediately
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

// ...Mouse and Touch event listeners (mousedown, touchmove, etc.) remain the same...
