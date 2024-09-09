const object = JSON.parse(localStorage.getItem('quizOptions'));
console.log(object);

const url = `https://opentdb.com/api.php?amount=${object.length}&category=${object.topic}&difficulty=${object.difficulty}&type=multiple`;
console.log(url);

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function appRun() {
    const data = await getData();

    document.querySelector('.question-js').innerHTML = data.results[0].question;
    console.log(data.results[0])
    let correctAnswer = data.results[0].correct_answer;
    let incorrectArray = data.results[0].incorrect_answers;
    
}

appRun();