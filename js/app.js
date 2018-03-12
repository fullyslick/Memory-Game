// Holds all of the card elements, converted in array of objects
const allCards = [...document.querySelectorAll(".card")];
// Holds the output of the shuffle function
let shuffleOutput;
// Holds the deck of cards
const deck = document.querySelector(".deck");
// Holds the restart button
const restartBtn = document.querySelector(".restart");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
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

/*
 * @description - restarts the game,
 * randomises the positions of allCards array of objects,
 * and replaces the "deck" of cards with new one.
 * TO:DO - reset timer and reset stars
 */
 function newGame(){
   // Make all cards closed and unmatched
   for (let i = 0; i < allCards.length; i++) {
     allCards[i].classList.remove("match", "show", "open") ;
   }
   // Call the helper function that shuffles the cards
   shuffle(allCards);

   // Fragment to hold the new "deck" of cards
   let newCardFragment = document.createDocumentFragment();

   // Remove the currently displayed cards
   for (var i = 0; i < allCards.length; i++) {
     console.log("All cards are " + allCards[i]);
     deck.removeChild(allCards[i]);
   }

   // Loop through each card and create its HTML
   for (let i = 0; i < shuffleOutput.length; i++) {
     newCardFragment.appendChild(shuffleOutput[i]);
   }

   // Add each card's HTML to the page
   deck.appendChild(newCardFragment);
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

/*
* Event listener to reset the game on "restart" button click
* @description Pop up dialog appears to confirm the restart,
* on click of confirm button the game is restated
*/
restartBtn.addEventListener("click" , function(){
  displayAllCards();
});

// The code below will display all cards. Use to check if shuffeling the cards is working
function displayAllCards() {
  for (let i = 0; i < allCards.length; i++) {
    let currentObject = allCards[i];
    currentObject.classList.add("match");
  }
}
