/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 *
 * GameScreen.jsx
 * This page is the main game screen. It handles all game logic related to actually playing a quiz.
 */

import { useState, useEffect } from 'react';
import useSound from 'use-sound';

import QuestionDisplay from './GameScreen/QuestionDisplay.jsx';
import GameHeader from './GameScreen/GameHeader.jsx';

import correctSfx from '../../audio/correct.mp3';
import wrongSfx from '../../audio/wrong.mp3';

const GameScreen = (props) => { 
    // states for accessing questions n stuff
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responseCode, setResponseCode ] = useState(0);
    const [apiCalls, setApiCalls ] = useState(0);
    const [questionAnswered, setQuestionAnswered ] = useState(false);

    // states for game score n stuff
    const [points, setPoints ] = useState(0);
    const [questionNumber, setQuestionNumber ] = useState(1);
    const [lives, setLives ] = useState(props.gameOptions.lives);
    const [time, setTime ] = useState(props.gameOptions.time);  
    const [isRunning, setIsRunning] = useState(props.gameOptions.mode === 'timed');

    const [playCorrect] = useSound(correctSfx);
    const [playWrong] = useSound(wrongSfx);

    // create the URL to access the API
    const buildURL = () => {
        if(props.gameOptions.category == 0){
            return `https://opentdb.com/api.php?amount=10&difficulty=easy`;
        } else {
            return `https://opentdb.com/api.php?amount=10&category=${props.gameOptions.category}&difficulty=easy`;
        }   
    }

    // this useEffect handles the countdown timer
    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
          timer = setInterval(() => {
            setTime(prev => {
                // End the timer
                if (prev <= 1) {
                    setIsRunning(false);
                    onGameEnd();
                    return 0;
                }
                return prev - 1;
            });
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [isRunning, time]);

    // this useEffect handles fetching the api data
    useEffect(() => {
        // fetch data from url and store in the states
        const fetchQuestions = async () => {
            const response = await fetch(buildURL());
            const data = await response.json();
            setResponseCode(data.response_code);
            setQuestions(data.results);
        };
        fetchQuestions();
    }, [apiCalls]);

    // gui to display the question
    const renderQuestion = () => {
        let questionText = questions[currentIndex].question;
        let incorrectOptions = questions[currentIndex].incorrect_answers;
        let correctOption = questions[currentIndex].correct_answer;
        return <QuestionDisplay questionText={questionText} incorrectOptions={incorrectOptions} correctOption={correctOption} onSelect={onSelect}/>
    }

    const onSelect = (option) => {
        setQuestionAnswered(true);
        
        // if you already answered the question don't let them change answer.
        if(questionAnswered) return;

        if(option == questions[currentIndex].correct_answer){
            onCorrect()
        } else {
            onIncorrect()
        }
    }

    const onCorrect = () => {
        setPoints(points + 1);
        playCorrect();
    }

    const onIncorrect = () => {
        if(props.gameOptions.mode == "endless"){
            setLives(lives - 1)
        }
        playWrong();
    }

    const onGameEnd = () => {
        // update stats
        props.updateStats(questionNumber, points, props.gameOptions.category)

        // send back game stats
        const gameResults = {
            points,
            questionNumber
        };
        props.setGameResults(gameResults);

        // update achievements
        props.updateAchievements();

        // set screen to game end screen
        props.gameEnd();

    }

    const onNext = () => {
        // fetch more questions if we've ran out
        if(currentIndex >= 9){
            setApiCalls(apiCalls + 1);
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }

        // set the question to be unanswered again (to hide next button)
        setQuestionAnswered(false);
        setQuestionNumber(questionNumber + 1);

        // End the game if answered all questions in timed mode, or no move lives in endless
        if(props.gameOptions.mode == "timed" && questionNumber >= props.gameOptions.numQuestions) {
            onGameEnd();
        }
        if(lives <= 0) {
            onGameEnd();
        }
    }

    return (
        <div className="d-flex flex-column align-items-center vh-100">
            <GameHeader mode={props.gameOptions.mode} lives={lives} time={time} questionNumber={questionNumber}/>
            <div className="mt-4">
                {responseCode == 0 ? 
                    <>
                        {questions.length === 0 ? <h1>Loading..</h1> : renderQuestion() }
                        {questionAnswered ? <button className="btn btn-primary btn-lg mb-3 w-100" onClick={onNext}>Next</button> : <></>}
                    </>
                    : 
                    <>
                        <h1>Not Enough Questions!</h1>
                        <button className="btn btn-primary mt-3" onClick={props.back}>
                            Back
                        </button>
                        {console.log(responseCode)}
                    </>
                }
            </div>
        </div>
    )
}

export default GameScreen;