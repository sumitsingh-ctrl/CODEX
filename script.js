let currentPlayer = 'X'; // X or O
let gameBoard = Array(9).fill(null);
let gameMode = 'two-player'; // Default is two-player mode
let isGameOver = false;
const boardElement = document.getElementById("game-board");

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Check if user is registered and the password matches
    if (localStorage.getItem(username) && localStorage.getItem(username) === password) {
        alert(`Logged in as ${username}`);
        showGame();
    } else {
        alert("Invalid username or password.");
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let newUsername = document.getElementById('new-username').value;
    let newPassword = document.getElementById('new-password').value;

    // Check if the username already exists
    if (localStorage.getItem(newUsername)) {
        alert("Username already exists. Please choose a different one.");
    } else {
        // Save the new user in localStorage
        localStorage.setItem(newUsername, newPassword);
        alert(`Registered successfully with username: ${newUsername}`);
        showLogin();
    }
});

function showRegistration() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function showGame() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    startGame();
}

function setGameMode() {
    gameMode = document.getElementById("game-mode").value;
    startGame();
}

function startGame() {
    isGameOver = false;
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    generateBoard();
}

function generateBoard() {
    boardElement.innerHTML = ''; // Clear the board
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", () => cellClick(i));
        boardElement.appendChild(cell);
    }
}

function cellClick(index) {
    if (gameBoard[index] || isGameOver) return;
    gameBoard[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).innerText = currentPlayer;
    if (checkWinner()) {
        alert(currentPlayer + ' wins!');
        isGameOver = true;
    } else if (gameBoard.every(cell => cell !== null)) {
        alert("It's a draw!");
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'one-player' && currentPlayer === 'O') {
            aiMove();
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function aiMove() {
    let availableMoves = gameBoard.map((val, index) => val === null ? index : -1).filter(index => index !== -1);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard[randomMove] = 'O';
    document.querySelector(`[data-index="${randomMove}"]`).innerText = 'O';
    if (checkWinner()) {
        alert('AI (O) wins!');
        isGameOver = true;
    } else {
        currentPlayer = 'X';
    }
}

function resetGame() {
    startGame();
}
