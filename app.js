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

const difficultySelect = document.getElementById("difficulty-select");
const startGameButton = document.getElementById("start-game-button");
const wordDisplay = document.getElementById("word-display");
const wrongLettersContainer = document.getElementById("wrong-letters");
const attemptsCount = document.getElementById("attempts-count");
const gameInfoContainer = document.getElementById("game-info-container");

//=================================== Functions ===================================

function setDifficulty(level) {
    currentDifficulty = level;
    filteredWords = hiddenWords.filter(wordObj => {
        return level === "easy" ? wordObj.dificulty <= 3 :
               level === "medium" ? wordObj.dificulty >= 4 && wordObj.dificulty <= 6 :
               wordObj.dificulty >= 7;
    });
}

function getRandomWord() {
    if (filteredWords.length === 0) setDifficulty(currentDifficulty);
    
    let newWord;
    do {
        newWord = filteredWords[Math.floor(Math.random() * filteredWords.length)].word.toLowerCase();
    } while (newWord === lastWord);

    lastWord = newWord;
    return newWord;
}

function startGame() {
    gameInfoContainer.classList.remove("hidden"); // Show the game elements

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

//================================== Event Listeners ===============================

startGameButton.addEventListener("click", startGame);
