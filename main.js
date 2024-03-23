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
document.addEventListener("click", userSquareSelect);

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

// 4) Upon loading the app should:

// 5) Handle a player clicking a square:
//   5.1) Obtain the index of the square that was clicked by either:
//     5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
//     5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element
//            equals the event object's target.
//   5.2) If the board has a value at the index, immediately return because that square is already taken.
//   5.3) If winner is not null, immediately return because the game is over.
//   5.4) Update the board array at the index with the value of turn.
//   5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
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
