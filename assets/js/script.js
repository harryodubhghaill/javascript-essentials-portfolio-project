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
    document.body.style.backgroundColor = 'blue';

    let data = loadQuestions();

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
            function incrementScore() {

                // Gets the current score from the DOM and increments it
            
                let oldScore = parseInt(document.getElementById("score").innerText);
                document.getElementById("score").innerText = ++oldScore;
            }
            incrementScore();
            document.getElementById('question-box').style.display = 'none';
            document.getElementById("next").style.display = 'block';
            document.body.style.backgroundColor = 'green';
            document.getElementById('message').style.display = 'block'
            document.getElementById('message').innerHTML = 'Correct'
        

        } else {
            document.getElementById('question-box').style.display = 'none';
            document.getElementById("next").style.display = 'block';
            document.body.style.backgroundColor = 'red';
            document.getElementById('message').style.display = 'block'
            document.getElementById('message').innerHTML = 'Ha! Wrong!'
        

        }
    }
    query = getUserAnswer;
    })
}