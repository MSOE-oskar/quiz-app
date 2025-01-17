/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * QuestionHeader.jsx
 * This component displays lives in endless mode and time in timed mode, as well as question number.
 */
const GameHeader = (props) => {
    return (
        <div className="flex flex-col space-y-4 w-full max-w-md">
            {props.mode === 'endless' ? <h4>Lives: {props.lives}</h4> : <h4>Time: {props.time}s</h4>}
            
            <h4>Question: {props.questionNumber}</h4>
        </div>
    )
}

export default GameHeader;