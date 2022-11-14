import { useState, useEffect, useCallback } from "react"
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordList.json"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}


function App() {
  /*
  1. We need to track what the current word is
  2. We need a way to track the letters that have been pressed
  3. We need to a way to recognize a win/loss
  */
 
  // Returns a random word from the word list
  const [wordToGuess, setWordToGuess] = useState(getWord)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]) // This will be an array of strings. All length of 1

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter)) // Take all the letters that have been guessed, and the ones that are NOT in the wordToGuess will be filtered into incorrectLetters
  
  const isLoser = incorrectLetters.length >= 6 // There are 6 body parts

  // We must check to see if every character has been guessed correctly
  // with .every(), if every single iteration of this loop returns true, then .every() will return true as well
  // We loop through every single character of the wordToGuess
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter)) // If every single letter of the wordToGuess has been guessed, you win

  const addGuessedLetter = useCallback((letter: string) => {
    // If the letter has already been guessed, or if the game has been won or lost, do nothing
    if (guessedLetters.includes(letter) || isLoser || isWinner) return

    // Otherwise, add the letter to the list of current letters
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser]) // "Dependency array" Every time these variables change, we will rerun the function


  // This will handle keyboard input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      //  This is a "regular expression" (regex). It's used to search through a string of text, validate text, and replace text 
      //  The search pattern is defined between 2 forward slashes
      //  Brackets [] are used to define your own custom character sets, like a range of all letters from a to z
      //  A carat ^  searches for a match at the beginning of the string (you can set a multiline flag /m to search at the beginning of every line, not just the first one)
      //  A dollar sign $ searches for a match at the end of the string (Again, you can add a multiline flag /m to search at the end of every line, not just the last one)
      
      // If the key pressed does NOT match any letter from a to z, do nothing.
      if (!key.match(/^[a-z]$/)) return

      // If the key pressed DOES match a letter from a to z, run addGuessedLetter 
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])


    // Refresh the game by pressing Enter
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        const key = e.key
        if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
      }

      document.addEventListener("keypress", handler)

      return () => {
        document.removeEventListener("keypress", handler)
      }
    }, [])

  return <div style={{
    maxWidth: "800px",
    display: "flex", 
    flexDirection: "column",
    gap: "2rem", // Spaces out all items
    margin: "0 auto", // Centers everything when larger than 800px
    alignItems: "center"
  }}>
    
    {/* Text for Win/Loss */}
    <div style = {{ fontSize: "2rem", textAlign: "center"}}>
    {isWinner && "Winner! - Press ENTER to try again"}
    {isLoser && "Nice Try - Press ENTER to try again"}
    </div>

    {/* For the drawing, we need to know how many guesses have been made */}
    <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
    <div style= {{ alignSelf: "stretch"}}> {/* This will strech the keyboard to fit the entire container, overriding the display: "flex" and alignItems: "center" properties on the overall App() container div */}
      <Keyboard 
        // Prevent user input once the player wins or loses
        disabled={isWinner || isLoser}
        // The letters that have been guessed correctly
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
    </div>
  </div>
}

export default App
