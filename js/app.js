// Holds all of the card elements
const allCards = document.querySelectorAll(".card");
// Holds the output of the shuffle function
let shuffleOutput;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return shuffleOutput = array;
}

/**
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * @description - randomises the positions of allCards NodeList,
 * and replaces the "deck" of cards with new one.
 * @param {allCard} - the NodeList from the DOM containing all cards
 */
 function newGame(){
   shuffle(allCards);

   console.log(shuffleOutput);
 }

window.onload = function(){
  newGame();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// The code below will display all cards. Use to check if shuffeling the cards is working
function displayAllCards() {
  for (let i = 0; i < allCards.length; i++) {
    let currentObject = allCards[i];
    currentObject.classList.add("match");
  }
}
