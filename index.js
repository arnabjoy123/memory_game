const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  hasFlippedCard = false;
  secondCard = this;

  checkformatch();
}

function checkformatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disablecards() : unflipcards();
}

function disablecards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipcards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

var timeLeft = 30;
var elem = document.getElementById("score-el");
var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    clearTimeout(timerId);
    doSomething();
  } else {
    elem.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}

var statusEl = document.getElementById("status-el");

function doSomething() {
  statusEl.innerHTML = " GAME OVER!";
}
