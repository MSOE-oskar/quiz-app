/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * ModeSelection.jsx
 * This component displays checkboxes to switch mode between endless and timed.
 */
const ModeSelection = (props) => {
    return (
        <div>
            <label className="fw-bold d-block">Mode</label>
            <div className="form-check">
                <input
                type="radio"
                id="endless"
                name="mode"
                value="endless"
                className="form-check-input"
                checked={props.mode === "endless"}
                onChange={(e) => props.setMode(e.target.value)}
                />
                <label className="form-check-label" htmlFor="endless">
                    Endless
                </label>
            </div>

            <div className="form-check">
                <input
                type="radio"
                id="timed"
                name="mode"
                value="timed"
                className="form-check-input"
                checked={props.mode === "timed"}
                onChange={(e) => props.setMode(e.target.value)}
                />
                <label className="form-check-label" htmlFor="timed">
                    Timed
                </label>
            </div>
        </div> 
    )
};

export default ModeSelection;