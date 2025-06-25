"use strict mode";

//Selecting elements
const player1El = document.querySelector(".player--1");
const player2El = document.querySelector(".player--2");
const score1El = document.querySelector("#score--1");
const score2El = document.getElementById("score--2");
const current1El = document.getElementById("current--1");
const current2El = document.getElementById("current--2");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--newgame");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Initializing game
const initializeGame = function () {
  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  diceEl.classList.add("hidden");
};

initializeGame();

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Rolling the dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    //console.log(dice);

    diceEl.src = `dice-images/dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer + 1}`).textContent =
        currentScore;
    } else {
      //Switch the player
      document.getElementById(`current--${activePlayer + 1}`).textContent = 0;
      //Removing player--active class from current active player and adding it to the next active player
      //This couldve also been been done using .classList.toggle() method
      document
        .querySelector(`.player--${activePlayer + 1}`)
        .classList.remove("player--active");
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer + 1}`)
        .classList.add("player--active");
      currentScore = 0;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer + 1}`).textContent =
      score[activePlayer];

    //Check if score>=100
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer + 1}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer + 1}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      //Switch the player
      document.getElementById(`current--${activePlayer + 1}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player1El.classList.toggle("player--active");
      player2El.classList.toggle("player--active");
    }
  }
});

btnNew.addEventListener("click", function () {
  activePlayer = 0;
  score[0] = 0;
  score[1] = 0;
  currentScore = 0;

  initializeGame();
  player1El.classList.add("player--active");

  if (playing) {
    player2El.classList.remove("player--active");
  } else {
    player1El.classList.remove("player--winner");
    player2El.classList.remove("player--winner");
    playing = true;
  }
});
