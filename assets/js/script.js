/**
 * calls the async function when user selects difficulty
 */
async function easySelection() {
    let rawQuestions = [];

    try {
        rawQuestions = await loadEasyQuestions();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}
async function mediumSelection() {
    let rawQuestions = [];

    try {
        rawQuestions = await loadMediumQuestions();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}
async function hardSelection() {
    let rawQuestions = [];

    try {
        rawQuestions = await loadHardQuestions();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

/**
 * async function to ingest data from trivia API and sort for use
 */
//Easy Questions
async function loadEasyQuestions(){
    let rawQuestions = await (await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')).json();

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

    //Medium Questions
    async function loadMediumQuestions(){
        let rawQuestions = await (await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple')).json();
    
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

   //Hard Questions     
async function loadHardQuestions(){
    let rawQuestions = await (await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple')).json();
        
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
 * Start game & difficulty selection
 */
// allows onclick to access internal function
let query;
/**
 * runs the game (different instances for difficulty)
 */
//Easy Game
function runEasyGame(){

    document.getElementById("next").style.visibility = "hidden"

    let data = loadEasyQuestions();

    data.then(function(result) {    //used .then to resolve a promise

        let singleQuestion = result[0];
        let correctAnswer = result[0].correctAnswer;

  
      document.getElementById('question').innerHTML = singleQuestion.question;

      document.getElementById('option-a').innerHTML = singleQuestion.answers[1];
      document.getElementById('option-b').innerHTML = singleQuestion.answers[3];
      document.getElementById('option-c').innerHTML = singleQuestion.answers[0];
      document.getElementById('option-d').innerHTML = singleQuestion.answers[2];

     function getUserAnswer(userAnswer){
        if (userAnswer === correctAnswer) {
            alert('correct');
            function incrementScore() {

                // Gets the current score from the DOM and increments it
            
                let oldScore = parseInt(document.getElementById("score").innerText);
                document.getElementById("score").innerText = ++oldScore;
            }
            incrementScore();
            document.getElementById("next").style.visibility = "visible";

        } else {
            alert('Nope, you dummy!');
            document.getElementById("next").style.visibility = "visible";
        }
    }
    query = getUserAnswer;
    })
}
//Medium Game
function runMediumGame(){

    document.getElementById("next").style.visibility = "hidden"

    let data = loadMediumQuestions();

    data.then(function(result) {    //used .then to resolve a promise

        let singleQuestion = result[0];
        let correctAnswer = result[0].correctAnswer;

  
      document.getElementById('question').innerHTML = singleQuestion.question;

      document.getElementById('option-a').innerHTML = singleQuestion.answers[1];
      document.getElementById('option-b').innerHTML = singleQuestion.answers[3];
      document.getElementById('option-c').innerHTML = singleQuestion.answers[0];
      document.getElementById('option-d').innerHTML = singleQuestion.answers[2];

     function getUserAnswer(userAnswer){
        if (userAnswer === correctAnswer) {
            alert('correct');
            function incrementScore() {

                // Gets the current score from the DOM and increments it
            
                let oldScore = parseInt(document.getElementById("score").innerText);
                document.getElementById("score").innerText = ++oldScore;
            }
            incrementScore();
            document.getElementById("next").style.visibility = "visible";

        } else {
            alert('Nope, you dummy!');
            document.getElementById("next").style.visibility = "visible";
        }
    }
    query = getUserAnswer;
    })
}
//Hard Game
function runHardGame(){

    document.getElementById("next").style.visibility = "hidden"

    let data = loadHardQuestions();

    data.then(function(result) {    //used .then to resolve a promise

        let singleQuestion = result[0];
        let correctAnswer = result[0].correctAnswer;

  
      document.getElementById('question').innerHTML = singleQuestion.question;

      document.getElementById('option-a').innerHTML = singleQuestion.answers[1];
      document.getElementById('option-b').innerHTML = singleQuestion.answers[3];
      document.getElementById('option-c').innerHTML = singleQuestion.answers[0];
      document.getElementById('option-d').innerHTML = singleQuestion.answers[2];

     function getUserAnswer(userAnswer){
        if (userAnswer === correctAnswer) {
            alert('correct');
            function incrementScore() {

                // Gets the current score from the DOM and increments it
            
                let oldScore = parseInt(document.getElementById("score").innerText);
                document.getElementById("score").innerText = ++oldScore;
            }
            incrementScore();
            document.getElementById("next").style.visibility = "visible";

        } else {
            alert('Nope, you dummy!');
            document.getElementById("next").style.visibility = "visible";
        }
    }
    query = getUserAnswer;
    })
}
/**
 * funcions attached to on click listeners for difficulty selection
 */
function easyGame(){
    document.getElementById('start-container').style.display = "none"
    document.getElementById('quiz-container').style.display = 'flex';
    runEasyGame();
}

function mediumGame(){
    document.getElementById('start-container').style.display = "none"
    document.getElementById('quiz-container').style.display = 'flex';
    runMediumGame();
}

function hardGame(){
    document.getElementById('start-container').style.display = "none"
    document.getElementById('quiz-container').style.display = 'flex';
    runHardGame();
}