/**
 * Selecting the HTML elements to update through Javascript
 */

const showQuestion = document.getElementById('question');
const answerA = document.getElementById('option-a');
const answerB = document.getElementById('option-b');
const answerC = document.getElementById('option-c');
const answerD = document.getElementById('option-d');

 document.addEventListener("DOMContentLoaded", function() {
    getQuestion();
	})
/**
 * Get question and answer data from trivia API
 */
async function getQuestion() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        if (!response.ok) throw Error();
        const data = await response.json();
        let question = data.results[0].question;
        let correctAnswer = data.results[0].correct_answer;
        let incorrectAnswers = data.results[0].incorrect_answers;
        let answerArray = incorrectAnswers.concat(correctAnswer);    //creates one array with all answers
        console.log(question);
        console.log(answerArray);
        showQuestion.innerHTML = question
        answerA.innerHTML = answerArray[0];
        answerB.innerHTML = answerArray[1];
        answerC.innerHTML = answerArray[2];
        answerD.innerHTML = answerArray[3];
        } catch (err) {
            console.error(err);
        }
    
}

function checkAnswer(){
    
}
