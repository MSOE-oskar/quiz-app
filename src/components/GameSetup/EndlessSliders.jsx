/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * EndlessSliders.jsx
 * This component displays sliders to customize lives in endless mode
 */
const EndlessSliders = (props) => {
    return (
        <div>
            <input
                type="range"
                min="1"
                max="5"
                value={props.lives}
                onChange={(e) => props.setLives(e.target.value)}
                className="form-range"
            />
            <span>{props.lives} Lives</span>
        </div>
    );
};

export default EndlessSliders;