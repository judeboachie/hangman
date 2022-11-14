import styles from "./Keyboard.module.css"


// A list of all the keys that can be typed out
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

type KeyboardProps = {
    disabled?: boolean // The question mark makes it an optional variable
    activeLetters: string[] 
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void // A function that takes in a letter and returns nothing
}

export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter, disabled = false } : KeyboardProps) {
    return (
        <div 
            style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", // gridTemplateColums specifies the number and widths of columns in a grid layout. Minimum size 75px, maximum size 1 fraction
                gap: ".5rem"
            }}
            >
                {KEYS.map(key => {
                    const isActive = activeLetters.includes(key)
                    const isInactive = inactiveLetters.includes(key)
                    return (
                        <button 
                            onClick={() => addGuessedLetter(key)} 
                            className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                            disabled={isInactive || isActive || disabled} 
                            key={key}
                        >
                            {key}
                        </button>
                    )
                })}
        </div>
    
    )
}