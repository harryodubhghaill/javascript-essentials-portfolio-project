/**
 * calls the async function when user selects difficulty
 */
async function easySelection() {
    let rawQuestions = [];

    try {
        rawQuestions = await loadQuestions();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

/**
 * async function to ingest data from trivia API and sort for use
 */
async function loadQuestions(){
    let rawQuestions = await (await fetch('https://opentdb.com/api.php?amount=10&type=multiple')).json();

        //creating a more suitable array for the game
      let questionsArray = [];

        for (let i in rawQuestions.results) {

            let question = rawQuestions.results[i].question;
            let correctAnswer = rawQuestions.results[i].correct_answer;
            let incorrectAnswers = rawQuestions.results[i].incorrect_answers;
            let answers = incorrectAnswers.concat(correctAnswer);

            let questionObject = {
                question, correctAnswer, incorrectAnswers, answers,
            }
            questionsArray.push(questionObject); 
        }
    return questionsArray
    };
/**
 * Start game
 */
 document.getElementById('game-over').style.display = 'none'
 document.getElementById('winner').style.display = 'none'
 document.getElementById('restart-btn').style.display = 'none'
 document.getElementById('rules').style.display = 'none'
 document.getElementById('quiz-container').style.display = 'none'
 document.getElementById('end-sceen').style.display = 'none'
// allows onclick to access internal function
let query;
/**
 * runs the game
 */

function runGame(){
    document.getElementById('start-container').style.display = 'none'
    document.getElementById('quiz-container').style.display = 'flex'
    document.getElementById('question-box').style.display = 'flex'
    document.getElementById("next").style.display = 'none'
    document.getElementById('message').style.display = 'none'
    document.body.style.backgroundColor = 'lightcyan';

    let data = loadQuestions();

    data.then(function(result) {    //used .then to resolve a promise

        let singleQuestion = result[0];
        let correctAnswer = result[0].correctAnswer;

        //
        //Attempts at shuffling answers array to variate answer position
        //

        // let items = singleQuestion.answers

        // let shuffledAnswers = [];

        // function shuffle(items) {
        //     for (let i = 0; i<items.length; i++){
        //         let randomAnswer = items[(Math.floor(Math.random()*items.length))];
        //         return randomAnswer;
        //     }
        // }
        // console.log(items);
        // console.log(shuffle(items));
  
      document.getElementById('question').innerHTML = singleQuestion.question;

      document.getElementById('option-a').innerHTML = singleQuestion.answers[1];
      document.getElementById('option-b').innerHTML = singleQuestion.answers[3];
      document.getElementById('option-c').innerHTML = singleQuestion.answers[0];
      document.getElementById('option-d').innerHTML = singleQuestion.answers[2];

    

     function getUserAnswer(userAnswer){
        if (userAnswer === correctAnswer) {
            incrementScore();
            correctStyleChanges();
        } else {
            decrementScore();
            incorrectStyleChanges();
        }
    }
    query = getUserAnswer;
    })
}

function correctStyleChanges(){
    document.getElementById('question-box').style.display = 'none';
    document.getElementById("next").style.display = 'block';
    document.body.style.backgroundColor = 'green';
    document.getElementById('message').style.display = 'block'
    document.getElementById('message').innerHTML = 'Correct'
}

function incorrectStyleChanges(){
    document.getElementById('question-box').style.display = 'none';
    document.getElementById("next").style.display = 'block';
    document.body.style.backgroundColor = 'red';
    document.getElementById('message').style.display = 'block'
    document.getElementById('message').innerHTML = 'Ha! Wrong!'
}
/**
 * Checks to see if max score is reached or all lives are lost
 * to advance game.
 */
function nextQuestion(){
    let score = document.getElementById('score').innerHTML
    let lives = document.getElementById('lives').innerHTML
    if (lives <= 0) {
        gameOver();
    } else if(score >= 10) {
        youWin();
    } else {
        runGame();
    }
}
/**
 * Shows winning screen
 */
function youWin(){
    document.getElementById('quiz-container').style.display = 'none'
    document.getElementById('end-sceen').style.display = 'flex'
    document.getElementById('winner').style.display = 'block'
    document.getElementById('restart-btn').style.display = 'block'
}

/**
 * Shows losing screen
 */
function gameOver(){
    document.getElementById('quiz-container').style.display = 'none'
    document.getElementById('end-sceen').style.display = 'flex'
    document.getElementById('game-over').style.display = 'block'
    document.getElementById('restart-btn').style.display = 'block'
}
/**
 * Adds score (value in HTML element) by a value of one
 */
function incrementScore() {

    // Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}
/**
 * Lowers lives (value in HTML element) by a value of one
 */
function decrementScore() {

    // Gets the current score from the DOM and decrements it

    let oldLives = parseInt(document.getElementById("lives").innerText);
    document.getElementById("lives").innerText = --oldLives;
}

function restartQuiz(){
    location.reload();
}

function showRules() {
    document.getElementById('rules').style.display = 'flex'
}

function hideRules() {
    document.getElementById('rules').style.display = 'none'
}