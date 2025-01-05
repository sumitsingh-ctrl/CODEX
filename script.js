// Select all necessary elements
const cells = document.querySelectorAll("[data-cell]");
const statusMessage = document.querySelector(".status-message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X"; // Starting player
let isGameActive = true; // Game state flag
const boardState = Array(9).fill(null); // Tracks board cells

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handles a cell click
function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // Ignore clicks if the cell is already taken or the game is over
  if (boardState[cellIndex] || !isGameActive) return;

  // Update board state and UI
  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check if the current player wins or if it's a draw
  if (checkWin()) {
    statusMessage.textContent = `Player ${currentPlayer} Wins! 🎉`;
    isGameActive = false;
  } else if (boardState.every(cell => cell)) {
    statusMessage.textContent = "It's a Draw! 🤝";
    isGameActive = false;
  } else {
    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Checks for a win based on the current board state
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

// Resets the game to the initial state
function resetGame() {
  boardState.fill(null); // Clear the board state
  isGameActive = true; // Set game state to active
  currentPlayer = "X"; // Reset starting player
  statusMessage.textContent = "Player X's Turn"; // Reset status message
  cells.forEach(cell => {
    cell.textContent = ""; // Clear cell content
    cell.classList.remove("taken"); // Remove 'taken' class
  });
}

// Add event listeners to all cells and reset button
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
