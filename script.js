"use strict";

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

const btnRules = document.querySelector(".btn--rules");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

// Starting conditions
let scores, currentScore, activePlayer, playing;

let gamesWon1 = 0;
let gamesWon2 = 0;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";
};

init();

// Close the rules info
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //   scores[activePlayer] = scores[activePlayer] + currentScore;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      // if player 1 wins
      if (activePlayer === 0) {
        gamesWon1++;
        document.getElementById(
          `player--score--${activePlayer}`
        ).textContent = `🎮 Games won: ${gamesWon1}`;
        // if player 2 wins
      } else if (activePlayer === 1) {
        gamesWon2++;
        document.getElementById(
          `player--score--${activePlayer}`
        ).textContent = `🎮 Games won: ${gamesWon2}`;
      }
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.getElementById(`name--${activePlayer}`).textContent = "Winner";
      // console.log(`Player ${activePlayer} wins`);
    } else {
      switchPlayer();
    }
  }
});

// Show the rules info
btnRules.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// Close the rules info when "X" button is clicked
btnCloseModal.addEventListener("click", function () {
  closeModal();
});

// Close the rules info when the background is clicked
overlay.addEventListener("click", function () {
  closeModal();
});

// Close the rules info when Escape(Esc) is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Reset the game
btnNew.addEventListener("click", init);
