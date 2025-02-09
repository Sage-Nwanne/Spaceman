document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("game-info-container").classList.add("hidden");
    document.getElementById("start-game-button").addEventListener("click", startGame);
    startGameButton.addEventListener('click', startGame);
});


// To avoid startGame() from running too early





//================================== Variables =====================================

const hiddenWords = [
  { word: 'apple', usedAlready: false, dificulty: 1 },
  { word: 'pineapple', usedAlready: false, dificulty: 3 },
  { word: 'kitten', usedAlready: false, dificulty: 1 },
  { word: 'mattress', usedAlready: false, dificulty: 1 },
  { word: 'kitchen', usedAlready: false, dificulty: 2 },
  { word: 'children', usedAlready: false, dificulty: 2 },
  { word: 'spectacle', usedAlready: false, dificulty: 4 },
  { word: 'watermelon', usedAlready: false, dificulty: 3 },
  { word: 'sculptor', usedAlready: false, dificulty: 5 },
  { word: 'Indoctrinated', usedAlready: false, dificulty: 7 },
  { word: 'differential', usedAlready: false, dificulty: 5 },
  { word: 'momentous', usedAlready: false, dificulty: 6 },
  { word: 'artist', usedAlready: false, dificulty: 2 },
  { word: 'gallon', usedAlready: false, dificulty: 1 },
  { word: 'moonlight', usedAlready: false, dificulty: 2 },
  { word: 'chromakopia', usedAlready: false, dificulty: 8 },
  { word: 'surreptitiously', usedAlready: false, dificulty: 10 },
  { word: 'resurrection', usedAlready: false, dificulty: 8 },
  { word: 'classification', usedAlready: false, dificulty: 9 },
  { word: 'mesopotamia', usedAlready: false, dificulty: 10 }
];

let selectedWord = ''; // Stores the currently selected word
let filteredWords = []; // Stores words filtered by difficulty
let lastWord = null; // Stores last selected word to prevent consecutive repeats
let currentDifficulty = "easy"; // Default difficulty
let attemptsLeft = 6; // Maximum attempts before losing
let guessedLetters = []; // Stores correct guesses
let wrongGuesses = []; // Stores incorrect guesses

//============================== Cached Element References =========================

const difficultySelect = document.getElementById("difficulty-dropdown");
const startGameButton = document.getElementById("start-game-button");
const wordDisplay = document.getElementById("word-display");
const wrongLettersContainer = document.getElementById("wrong-letters");
const attemptsCount = document.getElementById("attempts-count");
const gameInfoContainer = document.getElementById("game-info-container");
const keyboardContainer = document.getElementById("keyboard-container");





//================================== Event Listeners ===============================

startGameButton.addEventListener("click", startGame);

keyboardContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("key") && !event.target.classList.contains("disabled")) {
        let letter = event.target.dataset.letter.toLowerCase(); // Get clicked letter
        handleGuess(letter); // Process the guess
        disableKey(event.target); // Disable key after it's clicked
    }
});



//=================================== Functions ===================================

function setDifficulty(level) {
  currentDifficulty = level; // Store the selected difficulty

  if (level === "easy") {
      filteredWords = hiddenWords.filter(wordObj => wordObj.dificulty <= 3);
  } else if (level === "medium") {
      filteredWords = hiddenWords.filter(wordObj => wordObj.dificulty >= 4 && wordObj.dificulty <= 6);
  } else {
      filteredWords = hiddenWords.filter(wordObj => wordObj.dificulty >= 7);
  }
}


function getRandomWord() {
    if (filteredWords.length === 0) setDifficulty(currentDifficulty);
    
    let newWord;
    do {
        newWord = filteredWords[Math.floor(Math.random() * filteredWords.length)].word.toLowerCase();
    } while (newWord === lastWord); //if new word is same as last, it runs it again

    lastWord = newWord; // gets stored in last word to avoid the same issue for next round
    return newWord;
}

function updateWordDisplay() {
    wordDisplay.textContent = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function updateWrongGuesses() {
    wrongLettersContainer.innerHTML = wrongGuesses.map(letter => `<span class="wrong-letter">${letter} ❌</span>`).join(" ");
}

function updateAttempts() {
    attemptsCount.textContent = attemptsLeft;
    if (attemptsLeft < 4) {
        attemptsCount.classList.add("low-attempts");
    } else {
        attemptsCount.classList.remove("low-attempts");
    }
}

function hideHangmanParts() {
    // Select all parts of the hangman image
    document.querySelectorAll(".hangman-part").forEach(part => {
        part.style.visibility = "hidden"; // Hide each part
    });

    document.getElementById('hangman-container').style.visibility = 'hidden';
}

function checkWinCondition() {
    let displayedWord = wordDisplay.textContent.replace(/ /g, "");
    if (displayedWord === selectedWord) {
        document.getElementById("win-message").classList.remove("hidden");
        document.getElementById("play-again-button").classList.remove("hidden");
        disableAllKeys(); // Prevent further guesses
    }
}



function revealHangmanPart() {
    let incorrectAttempts = 6 - attemptsLeft; // Calculate how many mistakes have been made
    let hangmanParts = document.querySelectorAll(".hangman-part");


    if (attemptsLeft < 6) {
        document.getElementById("hangman-container").style.visibility = 'visible';
    }

    if (incorrectAttempts < hangmanParts.length) {
        hangmanParts[incorrectAttempts].style.visibility = "visible"; //reveal next image part
    }

    if (attemptsLeft <= 0) {
        hangmanParts.forEach(part => part.style.visibility = "visible"); //reveal fuill image if player loses
        document.getElementById("lose-message").style.display = "block";
        document.getElementById("lose-message").classList.remove("hidden");
        document.getElementById("play-again-button").classList.remove("hidden");
    
        
    }


}




function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) {
        return; // Ignore duplicate guesses
    }

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter); // Add correct guess
    } else {
        wrongGuesses.push(letter); // Add incorrect guess
        attemptsLeft--; // Decrease attempts
        revealHangmanPart(); // Show a part of the hangman
    }

    updateWordDisplay();
    updateWrongGuesses();
    updateAttempts();
    checkWinCondition();
}








function startGame() {

    // document.getElementById("lose-message").style.display = "none"; //hides from previous game(s)
    // document.getElementById("win-message").style.display = "none";

    hideHangmanParts(); // Reset image on game restart
    
    document.getElementById("game-info-container").classList.remove("hidden");
    document.querySelector(".starting-page-container").classList.add("hidden");

  setDifficulty(difficultySelect.value);
  selectedWord = getRandomWord();
  guessedLetters = [];
  wrongGuesses = [];
  attemptsLeft = 6;

  updateWordDisplay();
  updateWrongGuesses();
  updateAttempts();
  hideHangmanParts();
}

function disableKey(button) {
    button.classList.add("disabled");
}

document.getElementById("play-again-button").addEventListener("click", restartGame);

function restartGame() {
    location.reload(); // Reloads the page to reset the game
}


