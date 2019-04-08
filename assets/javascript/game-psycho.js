// Copyright 2019 Jan Jakubowski

// Create a string of the all the leters in the alphabet
const alphabet = "qwertyuiopasdfghjklzxcvbnm";

// Initilize variables to hold the number of guessess, list of previous guesses
var guessesCount = 0;
var guessesSoFar = "";
var isWinner = false;

// Create variables that hold references to the places in the HTML where we want to display things.
var tbdMsg = document.getElementById("tbd-text");
var directionsMsg = document.getElementById("directions-text");
var userChoiceMsg = document.getElementById("userChoice-text");
var isWinnerMsg = document.getElementById("isWinner-text");
var guessesSoFarMsg = document.getElementById("guessesSoFar-text");
var guessesCountMsg = document.getElementById("guessesCount-text");


// Function to randomly choose a letter and send to console log 
function pickALetter() {
  return alphabet[Math.floor(Math.random() * 26)];
}

// Clear the variables, get ready to play
function clearVariables () {
  var guessesCount = 0;
  var guessesSoFar = "";
  var isWinner = false;
}

var computerChoice = pickALetter();
console.log("CHEATER !!! The correct answer is " + computerChoice)
console.log("getting ready to listen");
userChoiceMsg.textContent = "Ready when you are";

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  
  // Determines which key was pressed and echos to screen
  var userGuess = event.key;
  console.log("key pressed = " + userGuess);
  userChoiceMsg.textContent = "You choose: " + userGuess;

  // if winner
  //   then notify user and prompt to play again

  if (userGuess === computerChoice) {
      var isWinner = true;
      
      var confirmQuit = confirm(userGuess + "is right!! Winner, Winner, Chicken Dinner -- Play Again?");
      if (confirmQuit == false) { 
        alert("THANKS FOR PLAYING !!!");
        tbdMsg.textContent = "";
        directionsMsg.textContent = "Sorry to see you go.";
        userChoiceMsg.textContent = "Refresh the page to start over";
        isWinnerMsg.textContent = "Please? I kinda getting to like you";
        guessesSoFarMsg.textContent = "";
        guessesCountMsg.textContent = "";
        return; 
      } else {
          tbdMsg.textContent = "AWESOME! "
          directionsMsg.textContent = "I'm thinking of another letter of the alphabet, what do you think it is?";        userChoiceMsg.textContent = "Ready when you are";
          isWinnerMsg.textContent = "";
          guessesSoFarMsg.textContent = "";
          guessesCountMsg.textContent = "";
          clearVariables;

          let computerChoice = alphabet[Math.floor(Math.random() * 26)];
          console.log("CHEATER !!! The correct answer is " + computerChoice)
          console.log("getting ready to listen");
      }
  } else {
      guessesSoFar = guessesSoFar + userGuess + " ";
      guessesCount++
      directionsMsg.textContent = "Try again, what letter am I thinking?";
      if (guessesCount <= 25) {
        isWinnerMsg.textContent = "I know you can do it";
      } else {
        isWinnerMsg.textContent = "You are totally stupid";
      }
      
      guessesSoFarMsg.textContent = "So far you have guessed: " + guessesSoFar;
      guessesCountMsg.textContent = "You guessed " + guessesCount + " times";
  }

};

// if ((userGuess === "r" && computerGuess === "s") ||
    //   (userGuess === "s" && computerGuess === "p") || 
    //   (userGuess === "p" && computerGuess === "r")) {
    //   wins++;
    // } else if (userGuess === computerGuess) {
    //   ties++;
    // } else {
    //   losses++;
    // }

    // Hide the directions
    // directionsText.textContent = "Press r, p or s to keep playing!";

    // Display the user and computer guesses, and wins/losses/ties.
    
    
    // winsText.textContent = "That's " + wins + " wrong guesses";
    // lossesText.textContent = "losses: " + losses;
    // tiesText.textContent = "ties: " + ties;