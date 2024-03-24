/*----- constants -----*/
const PLAYER_COLORS = {
  null: "white",
  1: "white",
  "-1": "white",
};

const PLAYER_MARKER = {
  null: "",
  1: "X",
  "-1": "O",
};

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const boardEls = [...document.querySelectorAll("#board > div")];
const msgEl = document.getElementById("msg");
const resetGameBtn = document.getElementById("reset-game");

/*----- event listeners -----*/
document.addEventListener("click", handleSquareSelect);
resetGameBtn.addEventListener("click", init);

/*----- functions -----*/

init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  board.forEach(function (cellVal, cellIdx) {
    const cellEl = document.getElementById(`idx${cellIdx}`);
    cellEl.style.backgroundColor = PLAYER_COLORS[cellVal];
    cellEl.innerHTML = `<p>${PLAYER_MARKER[cellVal]}</p>`;
  });
}

function renderMessage() {
  if (winner === null) {
    msgEl.innerText = `Hey ${PLAYER_MARKER[turn]} it is your turn`;
  } else if (winner === "T") {
    msgEl.innerText = "This game is a Tie";
  } else {
    msgEl.innerText = `${PLAYER_MARKER[winner]} has Won the game!`;
  }
}

function handleSquareSelect(evt) {
  const cellIdx = boardEls.findIndex((boardEl) => boardEl === evt.target);
  // guard to ensure that the player selected a valid square
  if (cellIdx === -1) return;
  if (board[cellIdx] !== null) return;
  if (winner !== null) return;
  board[cellIdx] = turn;
  winner = checkWinner(board);
  turn *= -1;
  render();
}

function checkWinner(board) {
  let winner = null;
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    let sum = board[a] + board[b] + board[c];
    let absVal = Math.abs(sum);

    if (absVal === 3) {
      winner = board[a];
      return winner;
    }
  }
  return board.includes(null) ? null : "T";
}
