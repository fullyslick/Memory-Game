// Stores all of the card elements, converted in array of objects
const allCards = [...document.querySelectorAll(".card")];
// Stores the output of the shuffle function
let shuffleOutput;
// Stores the deck of cards
const deck = document.querySelector(".deck");
// Stores the restart button
const restartBtn = document.querySelector(".restart");
// Stores the popup dialog
const popUpDialog = document.querySelector("#pop-up-dialog");
// Stores the pop up message
const popUpMessage = document.querySelector("#pop-up-message");
// Stores the confirm restart button
const playAgainBtn = document.querySelector("#play-again");
// Stores close popUpDialog button
const closeDialogBtn = document.querySelector(".close");
// Determine if the game is over or not
let isGameOver = false;
// Stores the open cards
let openCards = [];

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
function newGame() {
  // Game is restared so it is not over
  isGameOver = false;

  // Make all cards closed and unmatched
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove("match", "show", "open");
  }
  // Call the helper function that shuffles the cards
  shuffle(allCards);

  // Fragment to hold the new "deck" of cards
  let newCardFragment = document.createDocumentFragment();

  // Remove the currently displayed cards
  for (var i = 0; i < allCards.length; i++) {
    deck.removeChild(allCards[i]);
  }

  // Loop through each card and create its HTML
  for (let i = 0; i < shuffleOutput.length; i++) {
    newCardFragment.appendChild(shuffleOutput[i]);
  }

  // Add each card's HTML to the page
  deck.appendChild(newCardFragment);
}

// When the page is loaded change the position of the cards
window.onload = function() {
  newGame();
}

/*
 * @description Displays pop up dialog
 */
function showPopUpDialog() {
  // Display popUpDialog
  popUpDialog.style.display = "block";

  // If game is over display congratulations message and mettrics
  if (isGameOver) {
    // TO:DO Display metrics time and stars

    // Display congratulations message
    popUpMessage.textContent = "Congratulations! You won the game!"
    // Change the button message
    playAgainBtn.textContent = "Play Again!"
    // Hide close dialog button
    closeDialogBtn.style.display = "none";
  } else {
    // If game is not over, then this is an attempt to restart the game
    // Display restart message
    popUpMessage.textContent = "Do you really want to restart the game?"
    // Change the button message
    playAgainBtn.textContent = "Restart"
  }

  // Reset game on "play-again"/"restart" button click and close dialog
  playAgainBtn.addEventListener("click", function() {
    newGame();

    hidePopUpDialog();
  });
}

/*
 * @description Hides pop up dialog
 */
function hidePopUpDialog() {
  popUpDialog.style.display = "none";
}

/*
 * Event listener to reset the game on "restart" button click
 * @description Calls pop up dialog appears to confirm the restart,
 */
restartBtn.addEventListener("click", function() {
  // TO:DO Should Pause The Game Timer
  // Display close button if it is cleared by previous restart of the game
  closeDialogBtn.style.display = "block";

  showPopUpDialog();
});

/*
 * Close pop up dialog
 */
closeDialogBtn.addEventListener("click", function() {
  // TO:DO Unpause timer
  hidePopUpDialog();
});

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

// Clear the openCards array
function clearOpenCardsList() {
  openCards = [];
}

// Lock the cards in the open position
function matchedCards() {
  for (var i = 0; i < openCards.length; i++) {
    openCards[i].parentElement.classList.add("match");
  }

  clearOpenCardsList();
}

function notMatchedCards() {
  setTimeout(function() {
    for (var i = 0; i < openCards.length; i++) {
      openCards[i].parentElement.classList.remove("open", "show");
    }

    clearOpenCardsList();
  }, 500);

}
/*
 * @description Comapres the clicked cards
 */
function compareOpenCards() {
  console.log("compare");
  if (openCards[0].classList.value == openCards[1].classList.value) {
    // Cards matched
    matchedCards();
  } else {
    // Cards does not matched
    notMatchedCards();
  }
}

// Store open cards in a *list* of "open" cards
function storeOpenCards(clickedCard) {
  openCards.push(clickedCard.querySelector('i'));
  // if the list already has another card, check to see if the two cards match
  if (openCards.length == 2) {
    compareOpenCards();
  }
}

// Display the card's symbol
function displayCardSymbol(clickedCard) {
  clickedCard.classList.add("open", "show");
}

/*
 * Set up the event listener for a card.
 */
deck.addEventListener("click", function(e) {
  // Delagate the event listener on the child LI
  if (e.target.nodeName === 'LI') {
    displayCardSymbol(e.target);
    storeOpenCards(e.target);
  }
});

// The code below will display all cards. Use to check if shuffeling the cards is working
function displayAllCards() {
  for (let i = 0; i < allCards.length; i++) {
    let currentObject = allCards[i];
    currentObject.classList.add("open", "show");
  }
}
