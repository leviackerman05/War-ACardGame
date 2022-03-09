let deckId;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
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
    console.log("Card1 is the Winner");
  } else if (card2ValueIndex > card1ValueIndex) {
    console.log("Card2 is the Winner");
  } else {
    console.log("Its a tie");
  }
}

cardObj1 = {
  value: "9",
};

cardObj2 = {
  value: "ACE",
};

determineWinnerCard(cardObj1, cardObj2);
