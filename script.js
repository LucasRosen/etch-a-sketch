const gridContainer = document.querySelector("#container");

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

  return square;
}

generateGrid(16);
