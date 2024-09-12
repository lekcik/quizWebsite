const object = JSON.parse(localStorage.getItem('quizOptions'));

const url = `https://opentdb.com/api.php?amount=${object.length}&category=${object.topic}&difficulty=${object.difficulty}&type=multiple`;

function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function domUpdate(questionData, cycle, quizLength) {
    let count = document.querySelector('.js-count');
    let question = document.querySelector('.question-js');
    let variants = document.querySelectorAll('.variant-js');

    variants.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
    });

    let correctAnswer = questionData.correct_answer;
    let answArray = questionData.incorrect_answers;
    answArray.push(correctAnswer);
    shuffleArray(answArray);

    count.innerHTML = `Question ${cycle + 1} of ${quizLength}`;
    question.innerHTML = questionData.question;

    for (let i = 0; i < variants.length; i++) {
        variants[i].innerHTML = answArray[i];
    }

    return correctAnswer;
}

async function btnClick() {
    return new Promise((resolve) => {
        const btns = document.querySelectorAll('.variant-js');
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                resolve(btn.innerHTML);
            }, { once: true });
        });
    });
}

async function runApp() {
    async function runCycle(quizData, cycle, quizLength) {  
        let correctAnsw = domUpdate(quizData, cycle, quizLength);
        let answer = await btnClick();
        
        const btns = document.querySelectorAll('.variant-js');
        
        if (answer === correctAnsw) {
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].innerHTML === answer) {
                    btns[i].classList.add('correct');
                    break; 
                }
            }
            stats++;
        } else {
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].innerHTML === answer) {
                    btns[i].classList.add('incorrect');
                } else if (btns[i].innerHTML === correctAnsw) {
                    btns[i].classList.add('correct');
                }
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));  // 1-second delay
    }

    const data = await getData();
    const quizData = data.results;
    const quizLength = quizData.length;
    let stats = 0;
    let cycle = 0;

    while (cycle < quizLength) {
        await runCycle(quizData[cycle], cycle, quizLength);
        cycle++;
    }

    localStorage.setItem('quizStats', JSON.stringify(stats));
}

runApp();
