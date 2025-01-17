/*
 * Kata Quiz App
 * Oskar Sierzega
 * Edited: 1/17/2025 
 * 
 * MainMenu.jsx
 * The main navigation menu, to access all other pages.
 */

const MainMenu = (props) => { 
    return (
        <div className="d-flex flex-column align-items-center vh-100">
            <h1 className="mt-5">Quizzler</h1>
            <h4>Game by Oskar Sierzega</h4>
            <div className="mt-4">
                <button className="btn btn-primary btn-lg mb-3 w-100" onClick={props.gameSetup}>
                    Play Game
                </button>
                <button className="btn btn-success btn-lg mb-3 w-100" onClick={props.stats}>
                    Stats
                </button>
                <button className="btn btn-warning btn-lg mb-3 w-100" onClick={props.achievements}>
                    Achievements
                </button>    
            </div>
        </div>
    )
}

export default MainMenu;