const HEAD = (
    <div 
        style={{ 
            width: "50px",
            height: "50px", 
            borderRadius: "100%", // A perfect circle
            border: "10px solid black", 
            position: "absolute",
            top: "50px",
            right: "-30px" // This centers the head underneath the vertical hook, while accounting for the 10px border thickness of the head
        }} 
    />
)


const BODY = (
    <div 
        style={{ 
            width: "10px",
            height: "100px", 
            background: "black", 
            position: "absolute",
            top: "120px",
            right: 0
        }} 
    />
)

// Right-hand side, technically it's the hangman's left arm
const RIGHT_ARM = (
    <div 
        style={{ 
            width: "100px",
            height: "10px", 
            background: "black", 
            position: "absolute",
            top: "150px",
            right: "-100px",
            rotate: "-30deg",
            transformOrigin: "left bottom", // The center of rotation is going to be the bottom left corner of the arm, as opposed to the center of the arm
        }} 
    />
)


// Left hand side, technically it's the hangman's right arm
const LEFT_ARM = (
    <div 
        style={{ 
            width: "100px",
            height: "10px", 
            background: "black", 
            position: "absolute",
            top: "150px",
            right: "10px",
            rotate: "30deg",
            transformOrigin: "right bottom", // The center of rotation is going to be the bottom right corner of the arm, as opposed to the center of the arm
        }} 
    />
)

// Right hand side, tehcnically the left leg
const RIGHT_LEG = (
    <div 
        style={{ 
            width: "100px",
            height: "10px", 
            background: "black", 
            position: "absolute",
            top: "210px",
            right: "-90px",
            rotate: "60deg",
            transformOrigin: "left bottom"
        }} 
    />
)

// Left hand side, technically the right leg
const LEFT_LEG = (
    <div 
        style={{ 
            width: "100px",
            height: "10px", 
            background: "black", 
            position: "absolute",
            top: "210px",
            right: 0,
            rotate: "-60deg",
            transformOrigin: "right bottom"
        }} 
    />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG] // These need to be in the order you wanr them drawn as the incorrect guesses increase


type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return <div style={{ position: "relative" }}>
        {/* .slice() returns elements of an array from a given starting index to (not inclusive) ending index. As numberOfGuesses increases, */}
        {BODY_PARTS.slice(0, numberOfGuesses)}

        {/* Vertical Hook */}
        <div 
            style={{ 
                height: "50px",
                width: "10px", 
                background: "black",
                position: "absolute",
                top: 0,
                right: 0
            }} 
        />

        {/* Horizontal Overhang */}
        <div 
            style={{ 
                height: "10px",
                width: "200px", 
                background: "black", 
                marginLeft: "120px"
            }} 
        />

        {/* Vertical pole on the base */}
        <div 
            style={{ 
                height: "400px",
                width: "10px", 
                background: "black", 
                marginLeft: "120px" // This centers the pole on the base. Half of 250px is 125, then accounting for the fact that the stand is 10px wide, you shift it over to the left by half (5px), giving you 120
            }} 
        />
        
        
        {/* Horizontal base of the hangman stand */}
        <div style={{ height: "10px", width: "250px", background: "black" }}/>
    </div>
}