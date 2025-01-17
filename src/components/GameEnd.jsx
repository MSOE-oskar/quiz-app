/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * GameEnd.jsx
 * This screen displays final game score, as well as some nice confetti :)
 */

import JSConfetti from 'js-confetti'

import { useEffect } from 'react';
import useSound from 'use-sound';

import boomSfx from '../../audio/boom.mp3';

const GameEnd = (props) => { 
    const [playBoom] = useSound(boomSfx);
    
    // CONFETTI EFFECT OH YEAH!!
    useEffect(() => { 
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        playBoom();
    }, [])

    return (
        <div className="d-flex flex-column align-items-center vh-100">
            <h1 className="mt-5">Quiz Finished!</h1>
            <div className="mt-4">

                {props.gameOptions.mode === "endless" ? 
                    <h1>Points: {props.gameResults.points}</h1>
                    :
                    <h1>Points: {props.gameResults.points} / {props.gameOptions.numQuestions}</h1>    
                }
                
                <button className="btn btn-primary mt-3 mr-3" onClick={props.gameSetup}>
                    Play Again
                </button>
                <button className="btn btn-primary mt-3" onClick={props.back}>
                    Home
                </button>
            </div>
        </div>
    )
}

export default GameEnd;