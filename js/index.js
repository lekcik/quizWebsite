localStorage.removeItem('quizOptions');
localStorage.removeItem('quizStats');

function quizStart() {
    const topic = document.querySelector('.topic-js').value;
    const difficulty = document.querySelector('.difficulty-js').value;
    const length = document.querySelector('.length-js').value;

    if (topic == 'null' || difficulty == 'null' || length == 'null') {
        alert('Complete all fields!');
    }
    else {
        localStorage.removeItem('quizOptions');

        let lengthConverted = 0;
        
        if (length === 'short') {
            lengthConverted = 10;
        }
        else if (length === 'medium') {
            lengthConverted = 20;
        }
        else {
            lengthConverted = 30;
        }

        let object = {
            topic: topic,
            difficulty: difficulty,
            length: lengthConverted
        }

        localStorage.setItem('quizOptions', JSON.stringify(object));

        window.location.href = '../html/quiz.html'; 
    }
}