/*
to create a string of underscores according to the legnth of the word selected:

for (let u = 0, u < hiddenWord.word.length, u++){
if(usedAlready === false){
 let underscores = hiddenWord.word. length
====== still working on it=======
  }}


to call specific word (object):
hiddenWord.word[].length

*/


//================================== Variables =====================================

// Word list with difficulties
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

// State variables
let filteredWords = []; // Stores words filtered by difficulty
let lastWord = null; // Stores last selected word to prevent consecutive repeats
let currentDifficulty = "easy"; // Default difficulty


//============================== Cached Element References =========================


const wordDisplay = document.getElementById("word-display"); // Example
const difficultySelect = document.getElementById("difficulty-select");
const nextWordButton = document.getElementById("next-word-button");


//===================================  Functions ===================================

/**
* Shuffles an array using Fisher-Yates algorithm.
* @param {Array} arr - The array to shuffle.
*/
function shuffleWords(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
}



//================================== Event Listeners ===============================

// Listen for difficulty change
difficultySelect.addEventListener("change", handleDifficultyChange);

// Listen for next word button click
nextWordButton.addEventListener("click", displayNextWord);

// Initialize game with default difficulty
setDifficulty("easy");
displayNextWord(); // Show first word
