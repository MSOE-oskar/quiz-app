/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * Achievements.jsx
 * This page displays user achievements.
 */

const Achievements = (props) => { 
    return (
        <div className="d-flex flex-column align-items-center vh-100">
            <h1 className="mt-5">Achievements</h1>
            <div className="mt-4">
                <ul className="list-group overflow-auto h-75">
                    {Object.keys(props.achievementDescriptions).map((key) => (
                        <li key={key} className={`list-group-item d-flex align-items-center ${props.achievements[key] ? 'bg-light text-success' : ''}`}>
                            <input
                                type="checkbox"
                                className="form-check-input me-3"
                                checked={props.achievements[key]}
                                readOnly
                            />
                            <div className="w-100">
                                <h5 className="mb-1">{props.achievementDescriptions[key].title}</h5>
                                <p className="mb-0">{props.achievementDescriptions[key].description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <button className="btn btn-primary btn-lg mt-3 w-100" onClick={props.back}>
                Back
                </button>
            </div>
        </div>
    )
}

export default Achievements;