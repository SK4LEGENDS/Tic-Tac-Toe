const startButton = document.getElementById('start-button');
const gameBoard = document.getElementById('game-board');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset-button');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let scores = { X: 0, O: 0 };
let cells = [];

startButton.addEventListener('click', () => {
  player1 = player1Input.value || 'Player 1';
  player2 = player2Input.value || 'Player 2';
  player1Name.textContent = player1;
  player2Name.textContent = player2;
  document.querySelector('.player-info').style.display = 'none';
  gameBoard.style.display = 'block';
  startGame();
});

resetButton.addEventListener('click', () => {
  scores = { X: 0, O: 0 };
  player1Score.textContent = '0';
  player2Score.textContent = '0';
  currentPlayer = 'X';
  board.innerHTML = '';
  startGame();
});

function startGame() {
  board.innerHTML = '';
  cells = Array(9).fill(null);

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);

    cell.addEventListener('click', () => {
      if (!cells[i]) {
        cells[i] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWinner()) {
          scores[currentPlayer]++;
          updateScore();
          setTimeout(() => {
            alert(`${currentPlayer === 'X' ? player1 : player2} wins!`);
            startGame();
          }, 100);
        } else if (cells.every(cell => cell)) {
          setTimeout(() => {
            alert('It\'s a draw!');
            startGame();
          }, 100);
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
  }
}

function updateScore() {
  player1Score.textContent = scores.X;
  player2Score.textContent = scores.O;
}

function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
  ];

  return wins.some(combo => {
    const [a,b,c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}
