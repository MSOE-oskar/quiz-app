/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * Stats.jsx
 * This page displays user stats.
 */

const Stats = (props) => { 

    // This doesn't have to be a useState or anything since it doesnt update on this page.
    let correctRate;
    if(props.user.questionsAnswered == 0) { 
        correctRate = 0;
    } else {
        correctRate = Math.floor((props.user.questionsCorrect / props.user.questionsAnswered) * 100);
    }

    return (
        <div className="d-flex flex-column align-items-center vh-100">
            <h1 className="mt-5">{props.user.name}'s Stats</h1>
            <div className="mt-4">
                <h4>{props.user.questionsAnswered} questions answered</h4>
                <h4>{props.user.questionsCorrect} questions correct</h4>
                <h4>{correctRate}% correct rate</h4>

                <button className="btn btn-primary btn-lg mt-3 w-100 mb-3" onClick={props.back}>
                    Back
                </button>
            </div>
        </div>
    )
}

export default Stats;