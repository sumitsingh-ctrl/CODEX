document.addEventListener('DOMContentLoaded', () => {
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameOver = false;

  // Display the Login Form
  document.getElementById('login-form').addEventListener('submit', function (event) {
      event.preventDefault();
      let username = document.getElementById('login-username').value;
      let password = document.getElementById('login-password').value;
      
      // Simulate login process
      if (username && password) {
          document.getElementById('login-section').style.display = 'none';
          document.getElementById('game-section').style.display = 'block';
          document.getElementById('game-username').innerText = username;
          initializeGame();
      }
  });

  // Toggle to Registration Form
  document.getElementById('show-register').addEventListener('click', () => {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('register-section').style.display = 'block';
  });

  // Toggle to Login Form
  document.getElementById('show-login').addEventListener('click', () => {
      document.getElementById('register-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
  });

  // Game Initialization
  function initializeGame() {
      const gameContainer = document.getElementById('tic-tac-toe-game');
      gameContainer.innerHTML = '';
      gameBoard.fill('');

      for (let i = 0; i < 9; i++) {
          const button = document.createElement('button');
          button.addEventListener('click', () => makeMove(i));
          gameContainer.appendChild(button);
      }

      document.getElementById('game-status').innerText = `Player ${currentPlayer}'s turn`;
  }

  // Making a Move
  function makeMove(index) {
      if (gameBoard[index] || gameOver) return;
      gameBoard[index] = currentPlayer;
      document.getElementById('tic-tac-toe-game').children[index].innerText = currentPlayer;

      if (checkWinner()) {
          document.getElementById('game-status').innerText = `Player ${currentPlayer} wins! 🎉`;
          gameOver = true;
          
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          document.getElementById('game-status').innerText = `Player ${currentPlayer}'s turn`;
      }
  }

  // Check for Winner
  function checkWinner() {
      const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
          [0, 4, 8], [2, 4, 6]             // Diagonal
      ];

      return winPatterns.some(pattern => {
          const [a, b, c] = pattern;
          return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
      });
  }

  // Reset the Game
  document.getElementById('reset-game').addEventListener('click', () => {
      gameOver = false;
      currentPlayer = 'X';
      gameBoard.fill('');
      initializeGame();
      document.getElementById('game-status').innerText = `Player ${currentPlayer}'s turn`;
  });

  // Logout
  document.getElementById('logout').addEventListener('click', () => {
      document.getElementById('game-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
  });
});
