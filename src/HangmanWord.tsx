type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean // Reveal the word if the player loses. The question mark makes it an optional variable
}


export function HangmanWord( { guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {
    // We want to render each character in the word indiviudally
    
    return <div style={{ 
        display: "flex", 
        gap: ".25em", // Scales off the font size
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace"
        }}
        >
            {/* 
            .splitting on an empty space will split the word into individual letters. 
            Then, we map through each individual letter and get the index of each letter's location.
            Then, return a single span that contains that letter
            */}
            {wordToGuess.split("").map((letter, index) => (
                <span style={{ borderBottom: ".1em solid black"}} key={index}>   {/* In React, it's generally discouraged to use an index as a key for an element in a list, but in hangman, words can and often do have multiple of the same letter, so the index HAS to be the unique identifier for each letter */}
                    {/* This span will determine whether the letter is visible or not, and what colour it's going to be */}
                    <span style={{
                        // If a letter has been correctly guessed (part of the guessedLetters array), OR if the player has lost and reveal has been set to true, make it visible, otherwise, hide it
                        visibility: guessedLetters.includes(letter) || reveal 
                        ? "visible" 
                        : "hidden",
                        // If the player failed to guess a letter correctly AND reveal has been set to true, make the word red, otherwise make it black
                        color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
    </div>
}