// Couldn't make this work
var listOfPuzzles = [
  ["abc","random characters"],
  ["concord, new hampshire","state capital"],
  ["when along came a spider","nursery rhyme"],
  ["the empire strikes back","movie"],
  ["fleetwood mac","soft rock band"]
];

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// GLOBAL VARIABLE DECLARATIONS
// to be used as integer
var guessesCount;

// to be used as string
var PUZZLE;
var counterMsg;
var typeOfPuzzle;
var scratchpad;
var userGuess;

// to be used as array
var guessesSoFar;

// to be used as boolean (en francias s'il vous plait)
var inGuessesSoFar;
var outOfPuzzles;
var isLoser;
var gameOver;

// ///////////////////////////////////////////////////////////////////
// da DOM-inator

const scoreboardDiv = document.getElementById("theScore");
const gameCounterMsg = document.getElementById("gameCounter-txt");
const guessCounterMsg = document.getElementById("guessCounter-txt");
const userMessage1Msg = document.getElementById("userMessage1-txt");
const userMessage2Msg = document.getElementById("userMessage2-txt");

const endOfGameDiv = document.getElementById("theEndOfGame");
const audioElement = document.createElement('audio');
const playClip = document.getElementById("playEndOfGame");
const animatedgif = document.getElementById("animated-gif");

const thePuzzleDiv = document.getElementById("thePuzzle");
const categoryMsg = document.getElementById("category-txt");
const puzzleDisplay = document.getElementById("puzzleDisplay-txt");

const welcomeDiv = document.getElementById("theWelcome");

// ///////////////////////////////////////////////////////////////////
// FUNCTIONS

function pickPuzzle() {
  if (round == 5) {
    outOfPuzzles = true;
    return;
  }
  switch (round) {
    case 0:
      PUZZLE = "abc";
      typeOfPuzzle = "random characters";
      break;
    case 1:
      PUZZLE = "concord, new hampshire";
      typeOfPuzzle = "state capital";
      break;
    case 2:
      PUZZLE = "when along came a spider";
      typeOfPuzzle = "nursery rhyme";
      break;
    case 3:
      PUZZLE = "the empire strikes back";
      typeOfPuzzle = "movie";
      break;
    case 4:
      PUZZLE = "fleetwood mac";
      typeOfPuzzle = "soft rock band";
      break;
  }
  // typeOfPuzzle = listOfPuzzles[round,2]; 
  // PUZZLE = listOfPuzzles[round,1];
  
  PUZZLE = PUZZLE.toUpperCase();
  typeOfPuzzle = typeOfPuzzle.toUpperCase();
}

// Clear the variables, get ready to play
function initVariables () {
  round++;
  guessesCount = 0;
  guessesSoFar = "";  
  gameOver = false;
}

// Setup new game 
function newGameBoard () {

  welcomeDiv.style.display = "none";
  endOfGameDiv.style.display = "none";
  scoreboardDiv.style.display = "block";
  thePuzzleDiv.style.display = "block";

  // scoreboardDiv elements
  // counterMsg = ;
  guessesCount = 0;
  outOfPuzzles = false;
  guessCounterMsg.textContent = "# Wrong: " + 0;
  gameCounterMsg.textContent = "Round #" + round;
  userMessage1Msg.textContent = "Ready to Play?";
  userMessage2Msg.textContent = "Choose a Letter";
  
  
  // isWinnerMsg.textContent = "";
  
  // thePuzzleDiv elements
  categoryMsg.textContent = typeOfPuzzle;
  scratchpad = PUZZLE.replace(/[A-Z]/g, '-');
  puzzleDisplay.textContent = (scratchpad);
  guessesSoFar = [""];
  guessesCount = 0;
}

function winnerWinner() {
  userMessage1Msg.textContent = "Winner, Winner, Chicken Dinner";
  userMessage2Msg.textContent = "Press spacebar to continue";
  guessCounterMsg.textContent = "W-I-N-N-E-R !!!";
  animatedgif.setAttribute("src","assets/images/finale.gif");
  endOfGameDiv.style.display = "block";
  audioElement.setAttribute('src', 'assets/audio/fireworks.mp3');
  audioElement.play();
  gameOver = true;
}

function loserLoser() {
  userMessage1Msg.textContent = "That's your 7th incorrect guess";
  userMessage2Msg.textContent = "Press any key to continue";
  guessCounterMsg.textContent = "L-O-O-O-O-S-E-R";
  puzzleDisplay.textContent = (PUZZLE);
  animatedgif.setAttribute('src','assets/images/loser.gif');
  endOfGameDiv.style.display = "block";
  audioElement.setAttribute('src', 'assets/audio/baby-crying.mp3');
  audioElement.play();
  gameOver = true;
}

function noMoreFun() {
  userMessage1Msg.textContent = "OUT OF PUZZLES";
  userMessage2Msg.textContent = "Refresh Browser to Start Over or Close";
  guessCounterMsg.textContent = "KABOOM";
  thePuzzleDiv.style.display = "none";
  animatedgif.setAttribute('src','assets/images/adios-2.gif');
  endOfGameDiv.style.display = "block";
  audioElement.setAttribute('src', 'assets/audio/fail-trombone.mp3');
  audioElement.play();
  outOfPuzzles = true;
}

// Welcome to the game
scoreboardDiv.style.display = "none";
endOfGameDiv.style.display = "none";
thePuzzleDiv.style.display = "none";
welcomeDiv.style.display - "block";
round = 0;


// Ready to start
document.onkeyup = function(event) {

  if ((round === 0) || (gameOver) || (outOfPuzzles)) {
    newGame = false;
    pickPuzzle();
    if (outOfPuzzles) {
      noMoreFun ();
      return;
    }
    // PUZZLE = "ABC";
    // typeOfPuzzle = "random chars";
    initVariables();
    newGameBoard();
    console.log("CHEATER !!! The correct answer is " + PUZZLE);

    return;
  } 

  if (!(event.keyCode>=65 && event.keyCode<=90)) {
    console.log("INVALID KEY:" + event.key + " || keyCode: " + event.keyCode);
    userMessage1Msg.textContent = "You pressed an invalid key";
    userMessage2Msg.textContent = "Guess Again";
    return; 
  }

  userGuess = event.key.toUpperCase();
  userMessage1Msg.textContent = "You choose: " + userGuess;

  // check if userGuess is in the puzzle, 
  //  then set to true and update scratchpad & scratchpad display
  var inAnswer = false; 
  for (i=0; i < PUZZLE.length; i++ ) {
    if (userGuess === PUZZLE[i]) {
      inAnswer = true;
      scratchpad = scratchpad.substring(0, i) + userGuess + scratchpad.substring(i + 1);
      userMessage2Msg.textContent = "Yes! The letter " + userGuess + " is in the puzzle";
      audioElement.setAttribute('src', 'assets/audio/applause.mp3');
      audioElement.play();
    }
  }
  puzzleDisplay.textContent = (scratchpad);

  // If userGuess is not in the puzzle, 
  //   update wrong guess count and list of wrong guesses
  if (inAnswer == false) {

    audioElement.setAttribute('src', 'assets/audio/fail-buzzer.mp3');
    audioElement.play();

    // check if already guessed
    inGuessesSoFar = false;
    for (j=0; j < guessesSoFar.length; j++) {
      if (userGuess === guessesSoFar[j]) {
        inGuessesSoFar = true;
        userMessage2Msg.textContent = "You already know that " + userGuess + " is not in the puzzle";
        return;
      }
    }
  }

  if (!inGuessesSoFar && !inAnswer) {
    guessesSoFar[guessesCount] = userGuess;
    guessesSoFar.sort();
    guessesCount++;

    var displayGuessesSoFar = guessesSoFar[0];
    for (i=1; i < guessesSoFar.length; i++) {
      displayGuessesSoFar = displayGuessesSoFar + ", "+ guessesSoFar[i] ;
    }
    userMessage2Msg.textContent = displayGuessesSoFar;
    guessCounterMsg.textContent = "# Wrong: " + guessesCount;
  }
 
  if (guessesCount == 7) {
    isLoser = true;
    loserLoser ();
    return;
  }

  if (scratchpad === PUZZLE) { winnerWinner() };
    
// end of document.onkeyup = function(event)    
};  
