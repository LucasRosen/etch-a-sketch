const gridContainer = document.querySelector("#container");
const paletteContainer = document.querySelector("#color-palette");
const newGridButton = document.querySelector("#new-grid-button");
const clearGridButton = document.querySelector("#clear-grid-button");
const toggleGridCheckbox = document.querySelector("#grid-toggle");

let isGridOn = true;
let isDrawing = false;
let curColor = "#000000";

let defaultGridSize = 16;
let lastGridSize = defaultGridSize;

const colorPalette = [
  "#FFFFFF",
  "#000000",
  "#404040",
  "#FF0000",
  "#FF6A00",
  "#FFD800",
  "#B6FF00",
  "#4CFF00",
  "#00FF21",
  "#00FF90",
  "#00FFFF",
  "#0094FF",
  "#0026FF",
  "#4800FF",
  "#B200FF",
  "#FF00DC",
  "#FF006E",
];

// Generates a gridSize x gridSize grid of divs
function generateGrid(gridSize) {
  for (let x = 0; x < gridSize; x++) {
    const newColumn = document.createElement("div");
    newColumn.classList.add("column");
    gridContainer.appendChild(newColumn);

    for (let y = 0; y < gridSize; y++) {
      const newSquare = createSquare();
      newSquare.addEventListener("mousedown", () => {
        newSquare.style.backgroundColor = curColor;
      })

      if (isGridOn) {
        newSquare.classList.add("js-border");
      }

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

  if (isDrawing && targetSquare.parentElement.classList == "column") {
    targetSquare.style.backgroundColor = curColor;
  } else {
    targetSquare.style.opacity = "0.5";
  }
}

function onMouseOut(event) {
  const targetSquare = event.target;
  targetSquare.style.opacity = "1";
}

function onChangeColor(event) {
  curColor = event.target.style.backgroundColor;
  gridContainer.style.borderColor = curColor;
}

function enableGrid() {
  const columns = gridContainer.children;
  for (let i = 0; i < columns.length; i++) {
    const squares = columns[i].children;
    for (let j = 0; j < squares.length; j++) {
      isGridOn = true;
      squares[j].classList.add("js-border");
    }
  }
}

function disableGrid() {
  const columns = gridContainer.children;
  for (let i = 0; i < columns.length; i++) {
    const squares = columns[i].children;
    for (let j = 0; j < squares.length; j++) {
      isGridOn = false;
      squares[j].classList.remove("js-border");
    }
  }
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

// Toggle grid
toggleGridCheckbox.addEventListener("change", () => {
  if (toggleGridCheckbox.checked) {
    enableGrid();
  } else {
    disableGrid();
  }
});

generateGrid(16);

// Generate color palette
for (color of colorPalette) {
  const newSquare = createSquare();
  newSquare.style.backgroundColor = color;
  paletteContainer.appendChild(newSquare);

  newSquare.addEventListener("click", onChangeColor);
}
