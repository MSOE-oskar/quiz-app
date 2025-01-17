# quiz-app
### Quiz Kata for Direct Supply
### By Oskar Sierzega

I hope you enjoy my kata! I chose to create a Quiz app that accesses the Open Trivia Database API. Users are able to play a quiz of any category, as well as choose from two different modes: Endless, where you try to answer as many questions correctly with a limited number of lives, and Timed, where you try to answer a certain amount of questions in a given timeframe. I also added user stats, achievements, and soundeffects to hopefully make the game more fun. Thank you for the opportunity to interview at Direct Supply :)

## Known Issues
- Certain categories don't work since there aren't enough questions in the API with the way I access it.
- Trivia questions repeat as the game goes on. I found the session tokens in the API but I wasn't able to implement it on time.

## How to Run
1. Pull the repo onto local machine
2. Run the index.html file located in the "dist" folder on a live server (I used the live server extension in VSCode)

Alternatively
1. Pull the repo onto local machine
2. Open a terminal and cd into the project folder
3. npm install
4. npm run dev
