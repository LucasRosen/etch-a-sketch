const gridContainer = document.querySelector("#container");
const newGridButton = document.querySelector("#new-grid-button");

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

function clearGrid() {
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", onMouseOver);
  square.addEventListener("mouseout", onMouseOut);

  return square;
}

function onMouseOver(event) {
  const targetSquare = event.target;
  targetSquare.style.cssText = "opacity: 50%";
}

function onMouseOut(event) {
  const targetSquare = event.target;
  targetSquare.style.cssText = "opacity: 100%";
}

function isNumber(value) {
  return typeof value === "number";
}

// Generate new grid when button is clicked
newGridButton.addEventListener("click", () => {
  const newGridSize = Number(
    prompt("Enter new grid size:\nMust be a number between 10-100", 16)
  );
  if (isNumber(newGridSize) && newGridSize >= 10 && newGridSize <= 100) {
    clearGrid();
    generateGrid(newGridSize);
  } else {
    alert("Invalid grid size");
  }
});

generateGrid(16);
