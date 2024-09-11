async function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = [['a', 'b', 'c'], [1, 2, 3], [true, false]];
            resolve(result);
        }, 1000);
    });
}

let btn = document.querySelector('.btn');

async function runApp() {
    const data = await getData(); 

    await btn.addEventListener('click', () => {
        console.log('btn clicked');
    })

    console.log('func finished (after btn part executed)');
}

runApp();
