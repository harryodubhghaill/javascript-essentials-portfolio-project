/**
 * Get question and answer data from trivia API
 */

async function getQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        if (!response.ok) throw Error();
        const data = await response.json();
        console.log(data);
        } catch (err) {
            console.error(err);
        }
}
getQuestions();

