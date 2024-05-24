const cellSize = 10;
let cols, rows;
let grid, nextGrid;

function setup() {
  const canvas = document.getElementById('gameCanvas');
  canvas.width = 800;
  canvas.height = 800;
  const context = canvas.getContext('2d');
  
  cols = Math.floor(canvas.width / cellSize);
  rows = Math.floor(canvas.height / cellSize);
  grid = make2DArray(cols, rows);
  nextGrid = make2DArray(cols, rows);
  
  // Inicializando a grade com valores aleatórios
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  
  // Função de desenho chamada repetidamente
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhando a grade
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j] === 1) {
          context.fillStyle = '#000';
        } else {
          context.fillStyle = '#fff';
        }
        context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
    
    // Atualizando a grade para a próxima geração
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        let neighbors = countNeighbors(grid, i, j);
        
        // Aplicando as regras do jogo da vida
        if (state === 0 && neighbors === 3) {
          nextGrid[i][j] = 1;
        } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
          nextGrid[i][j] = 0;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
    
    // Copiando a próxima grade para a grade atual
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = nextGrid[i][j];
      }
    }
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// Função para criar uma matriz 2D
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Função para contar os vizinhos vivos
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

window.onload = setup;
