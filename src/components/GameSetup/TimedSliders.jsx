/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * TimedSliders.jsx
 * This component displays sliders to customize time and question amount in timed mode.
 */
const TimedSliders = (props) => {
    return (
        <div>
            <div>
                <input
                    type="range"
                    min="10"
                    max="300"
                    value={props.time}
                    onChange={(e) => props.setTime(e.target.value)}
                    className="form-range"
                />
                <span>{props.time} seconds</span>
            </div>
            <div>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={props.numQuestions}
                    onChange={(e) => props.setNumQuestions(e.target.value)}
                    className="form-range"
                />
                <span>{props.numQuestions} questions</span>
            </div>
        </div>
    );
};

export default TimedSliders;