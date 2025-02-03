// ======================================
// PSEUDOCODE FOR SPACEMAN GAME
// ======================================

/* 
------------------------------------------------------------------------------
1.                                  GAME INITIALIZATION
--------------------------------------------------------------------------------
- Select a random word from a predefined word list. (create a list of like 15 words)
*using an api for a dictionary or for a word generator to have a larger amount of words?*
*having a word difficulty selector???? Easy Medium Hard???*

=== for these I asked chatgpt for User stories and asked how I'd fulfil them
- Create a hidden word array with underscores (_ _ _ _ _).
- Set the maximum number of incorrect attempts.
- Initialize empty arrays for tracking correct and wrong guesses.
- Render the initial game board in the browser.
*/


// FUNCTION initializeGame():
//     selectedWord ← randomly choose a word from wordList
//     hiddenWordArray ← create an array of "_" matching selectedWord length
//     attemptsLeft ← 6  // Max incorrect guesses allowed
//     wrongGuesses ← empty array
//     correctGuesses ← empty array
//     gameOver ← false
    
    // RENDER game UI:
//     DISPLAY hiddenWordArray as "_ _ _ _ _"
//     *DISPLAY on-screen keyboard with A-Z buttons*
//     *DISPLAY attempts remaining count*
//     DISPLAY wrong guesses section (Show a box to the side of the screen with all the incorrect letters)
//      I'll need to add good styling on that. Will most likely use flexbox as well



// ---------------------------------------------------------------------
// 2.                        HANDLE USER INPUT (LETTER SELECTION)
// ---------------------------------------------------------------------
/*
- When the player selects a letter:
 
  - Ignore if the letter was already guessed.
  - Check if the letter is in the word.
  - If correct, reveal letter in hiddenWordArray.
  - If incorrect, reduce remaining attempts and add the letter to wrongGuesses.
  - Update the UI after processing the letter.
  - Check for win/loss conditions.
   - Ignore if the game is over.
*/

// FUNCTION handleGuess(letter):
//     IF gameOver THEN
//         RETURN  // Stop function if game has ended

//     IF letter is in correctGuesses OR wrongGuesses THEN
//         DISPLAY "Letter already guessed!" message
//         RETURN

//     IF letter is in selectedWord THEN
//         ADD letter to correctGuesses
//         REVEAL letter in hiddenWordArray at correct positions
//     ELSE
//         ADD letter to wrongGuesses
//         DECREMENT attemptsLeft

//     CALL updateUI()
//     CALL checkWin()
//     CALL checkLoss()

/* 

---------------------------------------------------------------------
                                   UI INTERACTIVITY
---------------------------------------------------------------------
- Listen for letter button clicks and call handleGuess().
- Listen for reset button click and restart the game.

EVENT LISTENER on letter button click:
    CALL handleGuess(letter)

EVENT LISTENER on reset button click:
    CALL resetGame()



---------------------------------------------------------------------
3.                                      UPDATE UI
---------------------------------------------------------------------

- Update the displayed word to show correctly guessed letters.
- Update wrong guesses section.
- Update remaining attempts.
- Disable guessed letter buttons to prevent re-selection.
// */


//something like 
// FUNCTION updateUI():
//     DISPLAY updated hiddenWordArray (e.g., "_ _ H _ _" if "H" was guessed)
//     DISPLAY wrongGuesses list
//     DISPLAY updated remaining attempts
//     DISABLE guessed letter buttons on UI

/* 
---------------------------------------------------------------------
4.                                CHECK WIN CONDITION
---------------------------------------------------------------------

- If all letters in hiddenWordArray match the selectedWord:
  - Display a "You Win!" message.
  - Set gameOver to true.
*/


// FUNCTION checkWin():
//     IF hiddenWordArray matches selectedWord THEN
//         DISPLAY "You win!" message
//         SET gameOver to true

/* 

---------------------------------------------------------------------
5.                              CHECK LOSS CONDITION
---------------------------------------------------------------------
- If the player runs out of attempts (attemptsLeft == 0):
  - Display "You Lose!" message.
  - Reveal the correct word.
  - Set gameOver to true.
*/

// FUNCTION checkLoss():
//     IF attemptsLeft == 0 THEN
//         DISPLAY (you lost mesage...) --> "You lose! The correct word was [selectedWord]"
//         SET gameOver to true

/* 
---------------------------
6. RESET GAME
---------------------------
- Resets all game variables.
- Selects a new word.
- Clears previous game data from the UI.
- Starts a new game round.




// */
// FUNCTION resetGame():
//     CALL initializeGame()
//     CLEAR previous game state from UI


