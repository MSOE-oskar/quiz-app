/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * DifficultySlider.jsx
 * This component displays sliders to customize difficulty of the quiz questions.
 */
const DifficultySlider = ({ difficulty, setDifficulty }) => {
    return (
        <div className="mb-3">
            <label className="fw-bold d-block">Difficulty</label>
            <input
                type="range"
                className="form-range"
                min="1"
                max="3"
                step="1"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
            />
            <div className="d-flex justify-content-between">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
            </div>
        </div>
    )
};

export default DifficultySlider;