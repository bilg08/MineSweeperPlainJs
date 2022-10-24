let ROWS = 9;
let COLS = 9;
let SIZE = 24;
let canvas = document.getElementById("canvas");

let cells = new Map();
let revealedKeys = new Set();

function generateBomb() {
  let count = Math.round(Math.sqrt(ROWS * COLS));

  let allKeys = [];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      allKeys.push(toKey(i, j));
    }
  }
  function compare() {
    let coinFlip = Math.random() > 0.5;
    return coinFlip ? 1 : -1;
  }
  allKeys.sort(compare);
  return allKeys.splice(0, count);
}
generateBomb();

let map = generateMap(generateBomb());
function getNeighBors(bombKey) {
  let [row, col] = fromKey(bombKey);
  //------------------------------------------------------//
  //-->  4-4(row-1 col-1)  4-5(row-1,col)  4-6 (row-1 col+1) --//
  //--> 5-4(row,col-1)    5-5(row,col)    5-6(row,col+1)     --//
  //-->  6-4 (row+1,col-1) 6-5(row++,col)  6-6(row++,col++)  --//
  //------------------------------------------------------//
  let neighbors = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];
  return neighbors.filter(isInBounds).map(([r, c]) => toKey(r, c));
}

function isInBounds(key) {
  let [row, col] = key;
  if (row < 0 || col < 0) return false;
  else if (row > ROWS || col > COLS) return false;
  return true;
}

function generateMap(bombs) {
  let map = new Map();
  function incrementDanger(neighborKey) {
    if (!map.has(neighborKey)) {
      map.set(neighborKey, 1);
    } else {
      let oldVal = map.get(neighborKey);
      if (oldVal != "bomb") {
        map.set(neighborKey, oldVal + 1);
      }
    }
  }
  for (let bombKey of bombs) {
    getNeighBors(bombKey);
    for (let neighborKey of getNeighBors(bombKey)) {
      incrementDanger(neighborKey);
    }
    map.set(bombKey, "bomb");
  }
  return map;
}

function toKey(row, col) {
  return row + "-" + col;
}

function fromKey(key) {
  return key.split("-").map(Number);
}
function createCanvas() {
  canvas.style.width = COLS * SIZE;
  canvas.style.height = ROWS * SIZE;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let cell = document.createElement("button");
      cell.style.width = SIZE;
      cell.style.height = SIZE;
      cell.style.display = "block";
      cell.style.float = "left";
      cell.style.display = "flex";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      canvas.appendChild(cell);
      let key = toKey(i, j);
      cells.set(key, cell);
      cell.onclick = () => {
        revealKeys(key);
      };
    }
  }
}
createCanvas();
uptadeCanvas();
function uptadeCanvas() {
  canvas.style.width = COLS * SIZE;
  canvas.style.height = ROWS * SIZE;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let key = toKey(i, j);
      let cell = cells.get(key);
      if (revealedKeys.has(key)) {
        cell.disabled = true;
        let value = map.get(key);
        cell.innerText = value;
        if (value === undefined) {
          cell.innerText = "";
        }
        if (value === 1) {
          cell.style.color = "blue";
        } else if (value === 2) {
          cell.style.color = "green";
        } else if (value === 3) {
          cell.style.color = "red";
        } else if (value === "bomb") {
          cell.textContent = "💣";
          cell.style.background = "red";
        }
      }
    }
  }
}
function revealKeys(key) {
  propagateReveal(key, new Set());
  uptadeCanvas();
}
function propagateReveal(key, visited) {
  revealedKeys.add(key);
  visited.add(key);

  let isEmpty = !map.has(key);

  if (isEmpty) {
    for (let neighborKey of getNeighBors(key)) {
      if (!visited.has(neighborKey)) {
        propagateReveal(neighborKey,visited)
      }
    }
  }
}
// function uptadeCanvas() {
//   canvas.style.width = COLS * SIZE;
//   canvas.style.height = ROWS * SIZE;

//   for (let i = 0; i < ROWS; i++) {
//     for (let j = 0; j < COLS; j++) {
//       let key = toKey(i, j);
//       let cell = cells.get(key);
//       if (revealedKeys.has(key)) {
//         cell.disabled = true;
//         let value = map.get(key);
//         cell.textContent = value;
//         if (value === undefined) {
//           cell.textContent = "";
//         } else if (value === 1) {
//           cell.style.color = "blue";
//         } else if (value === 2) {
//           cell.style.color = "green";
//         } else if (value === 3) {
//           cell.style.color = "red";
//         } else if (value === "bomb") {
//           cell.textContent = "💣";
//           cell.style.background = "red";
//         }
//       } else {
//         cell.disabled = false;
//         cell.textContent = "";
//       }
//     }
//   }
// }
// function revealKeys(key) {
//   revealedKeys.add(key);
//   uptadeCanvas();
// }

// function getNeighbors(key) {
//   let [row, col] = fromKey(key);
//   let neighborRowCols = [
//     [row - 1, col - 1],
//     [row - 1, col],
//     [row - 1, col + 1],
//     [row, col - 1],
//     [row, col + 1],
//     [row + 1, col - 1],
//     [row + 1, col],
//     [row + 1, col + 1],
//   ];
//   return neighborRowCols.filter(isInBounds).map(([r,c]) => toKey(r,c))
// }

// function isInBounds([row, col]) {
//   if (row < 0 || col < 0) {
//   return false
//   } else if (row > ROWS || col > COLS) {
//     return false
//   }
//   return true
// }

// function generateMap(seedBombs) {
//   let map = new Map();

// function incrementDanger(neighborKey) {
//   if (!map.has(neighborKey)) {
//     map.set(neighborKey, 1);
//   } else {
//     let oldVal = map.get(neighborKey);
//     if (oldVal !== "bomb") {
//       map.set(neighborKey, oldVal + 1);
//     }
//   }
// }

//   for (let key of seedBombs) {
//     map.set(key, "bomb");
//     for (let neighborKey of getNeighbors(key)) {
//       // console.log(neighborKey)
//       incrementDanger(neighborKey)
//     }
//   }
//   return map
// }
