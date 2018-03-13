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
// Stores the span that displays the moves
const movesDisplay = document.querySelector(".moves");
// Stores the number of moves
let movesCounter;
// Stores the number of matched cards pairs
let matchedCardsPairs;

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

  // Reset number of moves
  movesCounter = 0;
  movesDisplay.textContent = movesCounter;

  // Reset the number of matched cards pairs
  matchedCardsPairs = 0;

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
    // TO:DO Display metrics time and stars and moves

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
 * @description A pop up dialog appears to confirm the restart.
 */
restartBtn.addEventListener("click", function() {
  // TO:DO Should Pause The Game Timer
  // Display close button if it is cleared by previous restart of the game
  closeDialogBtn.style.display = "block";

  showPopUpDialog();
});

/*
 * Close pop up dialog on close button click
 */
closeDialogBtn.addEventListener("click", function() {
  // TO:DO Unpause timer
  hidePopUpDialog();
});

/*
 * @description Detect if all cards have matched
 * if the pair maxium of 8 pairs is reached,
 * then the game is over so show popUpDialog,
 * but with a slight delay to show css flip card animation
 */
function checkGameOver() {
  if (matchedCardsPairs == 8) {

    // game is over so set isGameOver to true
    isGameOver = true;

    // show congratulations dialog with a slight delay
    setTimeout(function() {
      showPopUpDialog();
    }, 500);
  }
}

/*
 * @description Increments the move counter and display it on the page,
 */
function incrementMoves() {
  movesCounter += 1;
  movesDisplay.textContent = movesCounter;
}

// Clear the openCards array
function clearOpenCardsList() {
  openCards = [];
}

/*
 * @description Matching cards get "match" class,
 * match counter is incremented by 1,
 * openCards list is cleared
 */
function matchedCards() {
  for (var i = 0; i < openCards.length; i++) {
    openCards[i].parentElement.classList.add("match");
  }

  // increment the matchedCardsPairs by 1
  matchedCardsPairs += 1;

  // match is detected so clear the openCards array
  clearOpenCardsList();
}

/*
 * @description Not matching cards are closed after some delay,
 * by removing "open" and "show" classes
 */
function notMatchedCards() {
  setTimeout(function() {
    for (var i = 0; i < openCards.length; i++) {
      openCards[i].parentElement.classList.remove("open", "show");
    }

    // match is not detected so clear the openCards array
    clearOpenCardsList();
  }, 500);

}
/*
 * @description Compares the clicked cards,
 * by compareing all their classes.
 * The same effect could be achieved by compareing outerHTML
 */
function compareOpenCards() {

  if (openCards[0].classList.value == openCards[1].classList.value) {
    // Cards matched
    matchedCards();
  } else {
    // Cards does not matched
    notMatchedCards();
  }
}

/*
 * @description Store the open card in an array of objects,
 * and if there are two objects (cards) in the array compare them
 */
function storeOpenCards(clickedCard) {
  openCards.push(clickedCard.querySelector('i'));

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

    // This "if" prevents user from accidently clicking on the same card and marking it as "match"
    if (!e.target.classList.contains("open")) {
      displayCardSymbol(e.target);
      storeOpenCards(e.target);
      incrementMoves();
      checkGameOver();
    }
  }
});

// The code below will display all cards. Use to check if shuffeling the cards is working
function displayAllCards() {
  for (let i = 0; i < allCards.length; i++) {
    let currentObject = allCards[i];
    currentObject.classList.add("open", "show");
  }
}
