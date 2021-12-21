async function loadQuestions(){
    let rawQuestions = await (await fetch('https://opentdb.com/api.php?amount=10&type=multiple')).json();


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

    console.log(questionsArray);

    return questionsArray
    };
    


document.addEventListener('DOMContentLoaded', async() => {
    let rawQuestions = [];

    try {
        rawQuestions = await loadQuestions();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
})

function getQuestionData() {
    
    let questionArray = loadQuestions();
    
}
