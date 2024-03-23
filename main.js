/*----- constants -----*/
const PLAYER_COLORS = {
  null: "white",
  1: "red",
  "-1": "green",
};

const WINNING_COMBINATIONS = [0, 1, 2];
[0, 3, 6];
[0, 4, 8];
[1, 4, 7];
[2, 5, 8];
[2, 4, 6];
[3, 4, 5];
[6, 7, 8];

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
  renderControls();
}

function renderBoard() {
  board.forEach(function (cellVal, cellIdx) {
    const cellEl = document.getElementById(`idx${cellIdx}`);
    cellEl.style.backgroundColor = PLAYER_COLORS[cellVal];
  });
}

function renderMessage() {
  if (winner === null) {
    msgEl.innerHTML = `Hey <span style="color: ${
      PLAYER_COLORS[turn]
    }">${PLAYER_COLORS[turn].toUpperCase()}</span> it is your turn`;
  } else if (winner === "T") {
    msgEl.innerText = "This game is a Tie";
  } else {
    msgEl.innerHTML = `<span style="color: ${
      PLAYER_COLORS[winner]
    }">${PLAYER_COLORS[winner].toUpperCase()}</span> has won the game!`;
  }
}

function renderControls() {}

function handleSquareSelect(evt) {
  const cellIdx = boardEls.findIndex((boardEl) => boardEl === evt.target);
  // guard to ensure that the player selected a valid square
  if (cellIdx === -1) return;
  if (board[cellIdx] !== null) return;
  if (winner !== null) return;
  board[cellIdx] = turn;
  turn *= -1;
  render();
}

function getWinner() {}

// 5) Handle a player clicking a square:

//
//   5.6) Set the winner variable if there's a winner:
//     5.6.1) Loop through the each of the winning combination arrays defined.
//     5.6.2) Total up the three board positions using the three indexes in the current combo.
//     5.6.3) Convert the total to an absolute value (convert any negative total to positive).
//     5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the
//            combo array. Exit the loop.
//   5.7) If there's no winner, check if there's a tie:
//     5.7.1) Set winner to 'T' if there are no more nulls in the board array.
//   5.8) All state has been updated, so render the state to the page (step 4.2).

// 6) Handle a player clicking the replay button:
//   6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).
