"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let scores, currentScore, activePlayer, playing;

init();
// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      // Add dice  to current score
      currentScore += dice;
      // Display current player's current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    //    Finish Game
    if (scores[activePlayer] >= 100) {
      // Set the game is not playing
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      // btnRoll.disabled = true;
      // btnHold.disabled = true;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

function switchPlayer() {
  // Reset the current player score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Set current socore to 0 for recalculation
  currentScore = 0;
  // Set the current player active by given the player--active class in html
  // for visual effect using toggle
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function init() {
  scores = [0, 0];
  currentScore = 0;
  // Setup a value for mulipulate active player in the logic
  activePlayer = 0;
  // Setup a varible to check if the gaming is playing
  // Simply controlling the button
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
}
