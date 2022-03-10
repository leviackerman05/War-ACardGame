let deckId;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const winnerCard = document.getElementById("winner-text");
const remainingCards = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      remainingCards.textContent = `Remaining Cards: ${data.remaining}`;
      deckId = data.deck_id;
    });
}

newDeckBtn.addEventListener("click", handleClick);
drawCardsBtn.addEventListener("click", drawCards);

function drawCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cardsContainer.children[0].innerHTML = `<img src = ${data.cards[0].image} class = "card"/>`;
      cardsContainer.children[1].innerHTML = `<img src = ${data.cards[1].image} class = "card"/>`;
      const winner = determineWinnerCard(data.cards[0], data.cards[1]);
      remainingCards.innerHTML = `Remaining Cards: ${data.remaining}`;
      winnerCard.textContent = winner;

      if (data.remaining === 0) {
        drawCardsBtn.disabled = true;
        if (computerScore > myScore) {
          winnerCard.textContent = `The Computer won the game`;
        } else if (myScore > computerScore) {
          winnerCard.textContent = `You win the game! Yayy :D`;
        } else {
          winnerCard.textContent = `Sheeeesh! It's a tie :|`;
        }
      }
    });
}

function determineWinnerCard(card1, card2) {
  let cardsArray = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = cardsArray.indexOf(card1.value);
  const card2ValueIndex = cardsArray.indexOf(card2.value);
  console.log(card1ValueIndex);
  console.log(card2ValueIndex);
  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer's Score: ${computerScore}`;
    return "Computer Wins";
  } else if (card2ValueIndex > card1ValueIndex) {
    myScore++;
    myScoreEl.textContent = `My Score: ${myScore}`;
    return "You Win";
  } else {
    return "War!";
  }
}
