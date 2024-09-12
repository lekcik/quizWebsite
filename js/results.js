const object = JSON.parse(localStorage.getItem('quizOptions'));
const res = JSON.parse(localStorage.getItem('quizStats'));

const percentage = (res / object.length) * 100;

const p = document.querySelector('.js-result');

p.innerText = `Total questions: ${object.length}

Correct answers: ${res}

${percentage}% answered correctly!
`;