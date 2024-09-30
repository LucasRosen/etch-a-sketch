const gridContainer = document.querySelector("#container");
const newGridButton = document.querySelector("#new-grid-button");
const clearGridButton = document.querySelector("#clear-grid-button");

let isDrawing = false;
let curColor = "#000000";

let defaultGridSize = 16;
let lastGridSize = defaultGridSize;

// Generates a gridSize x gridSize grid of divs
function generateGrid(gridSize) {
  for (let x = 0; x < gridSize; x++) {
    const newColumn = document.createElement("div");
    newColumn.classList.add("column");
    gridContainer.appendChild(newColumn);

    for (let y = 0; y < gridSize; y++) {
      const newSquare = createSquare();
      newColumn.appendChild(newSquare);
    }
  }
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", onMouseOver);
  square.addEventListener("mouseout", onMouseOut);

  return square;
}

function clearGrid() {
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
}

function onMouseOver(event) {
  const targetSquare = event.target;

  if (isDrawing) {
    targetSquare.style.backgroundColor = curColor;
  } else {
    targetSquare.style.opacity = "0.5";
  }
}

function onMouseOut(event) {
  const targetSquare = event.target;
  targetSquare.style.opacity = "1";
}

function isNumber(value) {
  return typeof value === "number";
}

// Check if mouse is down on the entire page when drawing
document.body.addEventListener("mousedown", () => {
  isDrawing = true;
});

document.body.addEventListener("mouseup", () => {
  isDrawing = false;
});

// Clear Grid
clearGridButton.addEventListener("click", () => {
  clearGrid();
  generateGrid(lastGridSize);
});

// Generate new grid when button is clicked
newGridButton.addEventListener("click", () => {
  const newGridSize = Number(
    prompt(
      "Enter new grid size:\nMust be a number between 10-100",
      defaultGridSize
    )
  );
  if (isNumber(newGridSize) && newGridSize >= 10 && newGridSize <= 100) {
    clearGrid();
    generateGrid(newGridSize);
    lastGridSize = newGridSize;
  } else {
    alert("Invalid grid size");
  }
});

generateGrid(16);

// TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Color picker/color swatches
// Clear grid button
// Toggle border/grid button
