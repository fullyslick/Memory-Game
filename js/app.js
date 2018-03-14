// Stores all of the card elements, converted in array of objects
const allCards = [...document.querySelectorAll('.card')];

// Stores the output of the shuffle function
let shuffleOutput;

// Stores the deck of cards
const deck = document.querySelector('.deck');

// Stores the restart button
const restartBtn = document.querySelector('.restart');

// Stores the popup dialog
const popUpDialog = document.querySelector('#pop-up-dialog');

// Stores the pop up message
const popUpMessage = document.querySelector('#pop-up-message');

// Stores the confirm restart button
const playAgainBtn = document.querySelector('#play-again');

// Stores close popUpDialog button
const closeDialogBtn = document.querySelector('.close');

// Determine if the game is over or not
let isGameOver = false;

// Stores the open cards
let openCards = [];

// Stores the span that displays the moves
const movesDisplay = document.querySelector('.moves');

// Stores the number of moves
let movesCounter;

// Stores the number of matched cards pairs
let matchedCardsPairs;

// Stores stars rating
const stars = document.querySelector('.stars').querySelectorAll('li');

// Stores the number of stars rating
let numberOfStars = 3;

// Stores the seconds inside the timer
const secondsDisplay = document.querySelector('#seconds');

// Stores the minutes inside timer
const minutesDisplay = document.querySelector('#minutes');

// Stores the timer JS interval function
let timer;

// Stores the timer seconds
let timerSeconds = 0;

// Stores the timer minutes
let timerMinutes = 0;

// Stores the seconds when the timer is paused
let pausedSeconds;

// Stores the minutes when the timer is paused
let pausedMinutes;

/*
 * @description: Shuffle function from http://stackoverflow.com/a/2450976
 * @param: The input array which elements are about to be shuffled
 * @returns: A new array of the shuffled elements
 */
function shuffle(array) {

  let currentIndex = array.length, temporaryValue, randomIndex;

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
 * @description: Restarts the game,
 * resets all vairables,
 * shuffles the cards,
 */
function newGame() {

  // Clear openCards array
  // Fixes the issue of comparing one open card before restart with one open card after restart
  openCards = [];

  // Game is restared so it is not over
  isGameOver = false;

  // Reset timer
  timerMinutes = 0;
  timerSeconds = 0;
  minutesDisplay.textContent = '0';
  secondsDisplay.textContent = '00';

  // Reset number of moves
  movesCounter = 0;
  movesDisplay.textContent = movesCounter;

  // Reset the number of matched cards pairs
  matchedCardsPairs = 0;

  // Bring stars back to screen by removing gone class
  for (var i = 0; i < stars.length; i++) {
    stars[i].classList.remove('gone');
  }

  // Reset the number of stars to default of 3
  numberOfStars = 3;

  // Make all cards closed and unmatched
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove('match', 'show', 'open');
  }

  // Call the helper function that shuffles the cards
  shuffle(allCards);

  // Remove the currently displayed cards
  for (var i = 0; i < allCards.length; i++) {
    deck.removeChild(allCards[i]);
  }

  // Fragment to hold the new 'deck' of cards
  let newCardFragment = document.createDocumentFragment();

  // Loop through each card and add it to the fragment
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
 * @description: Start timer,
 * updates the minutes and seconds on the DOM on every 1000ms
 */
function startTimer() {

  timer = setInterval(function() {

    timerSeconds += 1;

    // Display the time on the timer in this format 0:00
    if (timerSeconds < 10) {
      secondsDisplay.textContent = '0' + timerSeconds;
    }

    if (timerSeconds >= 10) {
      secondsDisplay.textContent = timerSeconds;
    }

    if (timerSeconds == 60) {
      timerMinutes += 1;
      timerSeconds = 0;
      minutesDisplay.textContent = timerMinutes;
      secondsDisplay.textContent = '00';
    }

  }, 1000);
}

/*
 * @description: Stops the timer
 */
function stopTimer() {

  window.clearInterval(timer);

}

/*
 *@description: Pauses the timer
 */
function pauseTimer() {

  stopTimer();

  // Get the current minutes and seconds of timer and store them in paused minutes and seconds variables
  pausedMinutes = timerMinutes;
  pausedSeconds = timerSeconds;
}

/*
 * @description: Resumes the timer
 */
function resumeTimer() {

  // Assign the paused time to timer to know where to continue from
  timerSeconds = pausedSeconds;
  timerMinutes = pausedMinutes;

  startTimer();
}

/*
 * @description: Displays pop up dialog
 */
function showPopUpDialog() {

  // Display popUpDialog
  popUpDialog.style.display = 'block';

  // If game is over display congratulations message and mettrics
  if (isGameOver) {

    // Stop the timer
    stopTimer();

    // Stores the metrics message
    let metricsSpan = document.createElement('span');

    // Insert the metrics message with ES6 concatination
    metricsSpan.textContent = `With ${movesCounter} moves and ${numberOfStars} stars for ${timerMinutes}:${timerSeconds} time!`

    // Display congratulations message
    popUpMessage.textContent = `Congratulations! You won the game!\n`;

    // Add metrics message after the congratulations message
    popUpMessage.appendChild(metricsSpan);

    // Change the button message
    playAgainBtn.textContent = `Play Again!`;

    // Hide close dialog button
    closeDialogBtn.style.display = 'none';

  } else {   // If game is not over, then this is an attempt to restart the game

    // Pause the timer
    pauseTimer();

    // Display restart message
    popUpMessage.textContent = `Do you really want to restart the game?`;

    // Change the button message
    playAgainBtn.textContent = `Restart`;

  }

  // Reset game on click of 'play-again'/'restart' button and close dialog
  playAgainBtn.addEventListener('click', function() {

    newGame();

    hidePopUpDialog();

  });
}

/*
 * @description: Hides pop up dialog
 */
function hidePopUpDialog() {

  popUpDialog.style.display = 'none';

}

/*
 *
 * @description: Event listener to reset the game on 'restart' button click.
 * A pop up dialog appears to confirm the restart.
 */
restartBtn.addEventListener('click', function() {

  // Display close button if it is cleared by previous restart of the game.
  closeDialogBtn.style.display = 'block';

  showPopUpDialog();
});

/*
 * @description: Close pop up dialog on close button click and resume timer.
 */
closeDialogBtn.addEventListener('click', function() {

  hidePopUpDialog();

  // Fixes resuming the timer on click of close button when user have not started the game yet
  if (movesCounter !== 0) {
    resumeTimer();
  }

});

/*
 * @description: Detect if all cards have matched,
 * if the pair maxium of 8 pairs is reached,
 * then the game is over so show popUpDialog,
 * but with a slight delay to show css flip card animation, too.
 */
function checkGameOver() {

  if (matchedCardsPairs == 8) {

    // Game is over so set isGameOver to true
    isGameOver = true;

    // Show congratulations dialog with a slight delay
    setTimeout(function() {

      showPopUpDialog();

    }, 500);

  }
}

/*
 * @description: Changes star rating depenging on number of moves
 */
function changeStarRating() {

  switch (movesCounter) {

    case 26:
      stars[2].classList.add('gone');
      numberOfStars = 2;

      break;

    case 32:
      stars[1].classList.add('gone');
      numberOfStars = 1;

      break;

  }
}

/*
 * @description: Increments the move counter and display it on the page,
 */
function incrementMoves() {

  movesCounter += 1;
  movesDisplay.textContent = movesCounter;

}

// @description: Clear/Empty the openCards array
function clearOpenCardsList() {

  openCards = [];

}

/*
 * @description: Matching cards get 'match' class,
 * match counter is incremented by 1,
 * openCards list is cleared
 */
function matchedCards() {

  for (var i = 0; i < openCards.length; i++) {
    openCards[i].parentElement.classList.add('match');
  }

  // Increment the matchedCardsPairs by 1
  matchedCardsPairs += 1;

  // Match is detected so clear the openCards array
  clearOpenCardsList();

}

/*
 * @description: Not matching cards are closed after some delay,
 * by removing 'open' and 'show' classes
 */
function notMatchedCards() {

  setTimeout(function() {

    for (var i = 0; i < openCards.length; i++) {
      openCards[i].parentElement.classList.remove('open', 'show');
    }

    // Match is not detected so clear the openCards array
    clearOpenCardsList();

  }, 500);

}
/*
 * @description: Compares the clicked cards,
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
 * @description: Store the open card in an array of objects
 */
function storeOpenCards(clickedCard) {

  openCards.push(clickedCard.querySelector('i'));

}

/*
 * @description: Display the card's symbol
 */
function displayCardSymbol(clickedCard) {

  clickedCard.classList.add('open', 'show');

}

/*
 * @description: Set up the event listener for a card.
 */
deck.addEventListener('click', function(e) {

  // Delagate the event listener on the child LI
  if (e.target.nodeName === 'LI') {

    // This 'if' prevents user from accidently clicking on the same card and marking it as 'match'.
    // Only on this condition provide other operations - displaying, comparing cards, etc.
    if (!e.target.classList.contains('open')) {

      // Display the card to the user
      displayCardSymbol(e.target);

      // Store the clicked card in an openCards array
      storeOpenCards(e.target);

      // If there are two objects (cards) in the openCards array compare them
      if (openCards.length == 2) {
        compareOpenCards();

        // Increment the move counter only when 2 cards are selected
        incrementMoves();
      }

      // If this is the first move of the player start timer
      if (movesCounter == 1) {
        startTimer();
      }

      // Change stars rating
      changeStarRating();

      // Check if game is over
      checkGameOver();

    }
  }
});
