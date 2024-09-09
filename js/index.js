function quizStart() {
    const topic = document.querySelector('.topic-js').value;
    const difficulty = document.querySelector('.difficulty-js').value;
    const length = document.querySelector('.length-js').value;

    if (topic == 'null' || difficulty == 'null' || length == 'null') {
        alert('Complete all fields!');
    }
    else {
        localStorage.removeItem('quizOptions');
        let object = {
            topic: topic,
            difficulty: difficulty,
            length: length
        }

        localStorage.setItem('quizOptions', JSON.stringify(object));

        window.location.href = '../html/quiz.html'; 
    }
}