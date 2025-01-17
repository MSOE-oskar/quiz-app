/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * App.jsx
 * The main component of the quiz app.
 */

import { useState, useEffect } from 'react';

import MainMenu from './components/MainMenu.jsx';
import Achievements from './components/Achievements.jsx';
import GameSetup from './components/GameSetup.jsx';
import GameScreen from './components/GameScreen.jsx';
import GameEnd from './components/GameEnd.jsx';
import Stats from './components/Stats.jsx';

const App = (props) => { 
    const [ page, setPage ] = useState("mainMenu");
    const [ gameOptions, setGameOptions ] = useState({});
    const [ gameResults, setGameResults ] = useState({});
    const [ categories, setCategories] = useState([]);

    const baseUser = {
        name: "Guest",
        questionsAnswered: 0,
        questionsCorrect: 0,
        categoryQuestionsCorrect: {},
        // obviously this can be improved, but since only 5 achievements its alright for now.
        achievements: {
            0: false,
            1: false,
            2: false,
            3: false, 
            4: false,
        }
    }

    const [user, setUser] = useState(() => {
        // if the user's already in local storage get it otherwise use the base user
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : baseUser;
    });

    // update the user's stats!
    const updateStats = (questionsAnswered, questionsCorrect, category) => {
        setUser((prevUser) => ({
            ...prevUser,
            questionsAnswered: prevUser.questionsAnswered + questionsAnswered,
            questionsCorrect: prevUser.questionsCorrect + questionsCorrect,
            categoryQuestionsCorrect: {
                ...prevUser.categoryQuestionsCorrect,
                // This prevents there from being NaN for category questions correct. JS is Weird..
                [category]: prevUser.categoryQuestionsCorrect[category] ? prevUser.categoryQuestionsCorrect[category] + questionsCorrect : questionsCorrect,  
            }
        }));
    }

    const achievementDescriptions = {
        0: {
            title: "I am Speed",
            description: "Complete a 10 Question quiz of any category in 30 seconds."
        },
        1: {
            title: "Quiz Genius",
            description: "Answer 100 questions of any category CORRECTLY."
        },
        2: {
            title: "Marathon",
            description: "Reach 26 points in endless mode."
        },
        3: {
            title: "Sudden Death",
            description: "Reach 10 points in endless mode starting with 1 life."
        },
        4: {
            title: "Quiz Addict",
            description: "Answer 1000 questions of any category."
        },
    }

    // This does a check to see if any achievements unlocked.
    // Probably i would do this better using a list of predicates thank you iterate over..
    // but for now with only 5 achievements it works.
    const updateAchievements = () => {
        // achievement 1
        if(gameOptions.mode == "timed" && gameOptions.time <= 30 && gameOptions.numQuestions >= 10) {
            setUser((prevUser) => ({
                ...prevUser,
                achievements: {...prevUser.achievements, 0: true},
            }));
        };
        // achievement 2
        if(user.questionsCorrect >= 100) {
            setUser((prevUser) => ({
                ...prevUser,
                achievements: {...prevUser.achievements, 1: true},
            }));
        };
        // achievement 3
        if(gameOptions.mode == "endless" && gameResults.points >= 26) {
            setUser((prevUser) => ({
                ...prevUser,
                achievements: {...prevUser.achievements, 2: true},
            }));
        };
        // achievement 4
        if(gameOptions.mode == "endless" && gameOptions.lives == 1 && gameResults.points >= 10) {
            setUser((prevUser) => ({
                ...prevUser,
                achievements: {...prevUser.achievements, 3: true},
            }));
        };
        // achievement 5
        if(user.questionsAnswered >= 1000) {
            setUser((prevUser) => ({
                ...prevUser,
                achievements: {...prevUser.achievements, 4: true},
            }));
        };
    }

    // This useffect updats the user in the local storage!!!!!!!!
    useEffect(() => {
        // clear for testing
        //localStorage.clear()
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    
    // fetch the list of categories from the api
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("https://opentdb.com/api_category.php");
            const data = await response.json();
            setCategories(data.trivia_categories);
        };
        fetchCategories();
    }, []);

    const renderSwitch = (page) => {
        switch(page) {
            case "mainMenu":
                return <MainMenu achievements={goAchievements} gameSetup={goGameSetup} stats={goStats}/>;
            case "gameSetup":
                return <GameSetup back={goMainMenu} setGameOptions={setGameOptions} gameScreen={goGameScreen} categories={categories}/>;
            case "gameScreen":
                return <GameScreen 
                    back={goMainMenu} 
                    gameOptions={gameOptions} 
                    setGameResults={setGameResults} 
                    gameEnd={goGameEnd} 
                    updateStats={updateStats} 
                    updateAchievements={updateAchievements}
                />;
            case "gameEnd":
                return <GameEnd back={goMainMenu} gameSetup={goGameSetup} gameResults={gameResults} gameOptions={gameOptions}/>;
            case "stats":
                return <Stats back={goMainMenu} user={user}/>;
            case "achievements":
                return <Achievements back={goMainMenu} achievementDescriptions={achievementDescriptions} achievements={user.achievements} />;
            default:
                return <h1>Error</h1>
        }
    }

    const goMainMenu = () =>{
        setPage("mainMenu");
    }

    const goAchievements = () =>{
        setPage("achievements");
    }

    const goGameSetup = () => {
        setPage("gameSetup");
    }

    const goGameScreen = () => {
        setPage("gameScreen")
    }
    
    const goGameEnd = () => {
        setPage("gameEnd");
    }

    const goStats = () => {
        setPage("stats");
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="card text-center p-4 rounded w-50 h-75">
                {renderSwitch(page)}
            </div>
        </div>
    );
}

export default App;