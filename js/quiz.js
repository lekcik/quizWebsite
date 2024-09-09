const object = JSON.parse(localStorage.getItem('quizOptions'));
console.log(object);

const url = `https://opentdb.com/api.php?amount=${object.length}&category=${object.topic}&difficulty=${object.difficulty}`;
console.log(url);

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function test() {
    const data = await getData(); 
    for (let x of data.results) { 
        console.log(x);
    }
}

test();