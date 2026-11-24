const colors = ['red', 'gold', 'blue', 'green', 'purple', 'orange', 'pink', 'brown'];
const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const movesEl = document.getElementById('moves');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let flipTimer = null;
let score = 0;
let moves = 0;

function shuffle(arr) {
 for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1)); 
 const temp = arr[i]; 
  arr[i] = arr[j];
  arr[j] = temp; }
}


function startGame() {
 clearTimeout(flipTimer);
 board.innerHTML = '';
 secondCard = null;
 lockBoard = false;
 score = 0;
 moves = 0;
 scoreEl.textContent = 0;
 movesEl.textContent = 0;
 message.textContent = '';


 const deck = [...colors, ...colors];
 shuffle(deck);


 for (let i = 0; i < deck.length; i++) {
 const card = document.createElement('div');
 card.className = 'card';
 card.dataset.color = deck[i];
 card.addEventListener('click', onCardClick);
 board.appendChild(card);
 }
}


function openCard(card) {
 card.classList.add('open');
 card.style.background = card.dataset.color;
}


function closeCard(card) {
 card.classList.remove('open');
 card.style.background = '';
}


function onCardClick(event) {
 const card = event.target;


 if (lockBoard) return;
 if (card === firstCard) return;
 if (card.classList.contains('found')) return;


 openCard(card);


 if (firstCard === null) {
  firstCard = card;
  return;
 }

 secondCard = card;
 moves++;
 movesEl.textContent = moves;

 if (firstCard.dataset.color === secondCard.dataset.color) {
    firstCard.classList.add('found');
    secondCard.classList.add('found');    score++;
    scoreEl.textContent = score;
    firstCard = null;
 secondCard = null;
 if (score === 8) {
 message.textContent = 'Победа! Все пары найдены за ' + moves + ' ходов';
 }
 } else {
 lockBoard = true;
    flipTimer = setTimeout(function () {
    closeCard(firstCard);
    closeCard(secondCard);
    firstCard = null;
     secondCard = null;
    lockBoard = false;
}, 1000);
 }
}
restartBtn.addEventListener('click', startGame);
startGame();