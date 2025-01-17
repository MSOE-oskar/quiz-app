/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * GameSetup.jsx
 * This page asks the user what game settings they want to use, including category and mode.
 */

import { useState } from 'react';

import CategoryDropdown from "./GameSetup/CategoryDropdown.jsx";
import DifficultySlider from "./GameSetup/DifficultySlider.jsx";
import ModeSelection from "./GameSetup/ModeSelection.jsx";
import EndlessSliders from './GameSetup/EndlessSliders.jsx';
import TimedSliders from './GameSetup/TimedSliders.jsx';

const GameSetup = (props) => { 

    const [category, setCategory] = useState(9);
    const [difficulty, setDifficulty] = useState(1); // 1: Easy, 2: Med, 3: Hard
    const [mode, setMode] = useState("endless");

    const [lives, setLives] = useState(5);
    const [time, setTime] = useState(300);
    const [numQuestions, setNumQuestions] = useState(10);

    // set all the game options and switch to actual gameplay screen.
    const handleStartQuiz = () => {
        const gameOptions = {
            category,
            difficulty: difficulty === 1 ? "easy" : difficulty === 2 ? "medium" : "hard",
            mode,
            lives,
            time,
            numQuestions
        };
        props.setGameOptions(gameOptions);
        props.gameScreen();
    };

    return (
        <div className="d-flex flex-column align-items-center vh-100">
            <h1 className="mt-5">Play a Quiz</h1>
            <div className="mt-4">
                
                <CategoryDropdown categories={props.categories} setCategory={setCategory} />

                {/** There arent enough questions for this to work... i always end up getting "not enough questions" */}
                {/* <DifficultySlider difficulty={difficulty} setDifficulty={setDifficulty} /> */}

                <ModeSelection mode={mode} setMode={setMode} />

                {mode === "endless" && (
                    <EndlessSliders lives={lives} setLives={setLives} />
                )}

                {mode === "timed" && (
                    <TimedSliders time={time} setTime={setTime} numQuestions={numQuestions} setNumQuestions={setNumQuestions} />
                )}

                <button className="btn btn-primary mt-3 mr-3" onClick={handleStartQuiz}>
                    Start Quiz
                </button>
                <button className="btn btn-primary mt-3" onClick={props.back}>
                    Back
                </button>

                <br/>
                <br/>
                Sound Effects by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=43861">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=43861">Pixabay</a>
            </div>
        </div>
    )
}

export default GameSetup;