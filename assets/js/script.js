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
 * calls the async function when all DOM is loaded and catches errors
 */
document.addEventListener('DOMContentLoaded', async() => {
    let rawQuestions = [];

    try {
        rawQuestions = await loadQuestions();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
})


/**
 * injects and renders data on page
 */
function renderQuestion(){

    let data = loadQuestions();

    data.then(function(result) {    //used .then to resolve a promise

        let singleQuestion = result[0];
        let correctAnswer = result[0].correctAnswer

        console.log(correctAnswer);

  
      document.getElementById('question').innerHTML = singleQuestion.question;

      document.getElementById('option-a').innerHTML = singleQuestion.answers[0];
      document.getElementById('option-b').innerHTML = singleQuestion.answers[1];
      document.getElementById('option-c').innerHTML = singleQuestion.answers[2];
      document.getElementById('option-d').innerHTML = singleQuestion.answers[3];
    })   
}
renderQuestion();

/**
 * Gets users answer
 */
function getUserAnswer(userAnswer){
    console.log(userAnswer);
    return userAnswer;
}
/** 
 * Checks to see if user answer === correct answer
*/
// function checkAnswer() {
//     if (getUserAnswer() === )
// }

// checkAnswer();