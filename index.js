let spinner = document.getElementById("spinner");
let speedTypingTest = document.getElementById("speedTypingTest");
let timerDisplay = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");

let startTime;
let timeInterval;

function getRandomQuote() {
    spinner.classList.remove('d-none');
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            spinner.classList.add('d-none');
            quoteDisplay.textContent = data.content;
            startTime = Date.now();
            timeInterval = setInterval(updateTimer, 1000);
        })
}

function updateTimer() {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = elapsedTime + " seconds";
}

function stopTimer() {
    clearInterval(timeInterval);
}

function resetTimer() {
    clearInterval(timeInterval);
    timerDisplay.textContent = "0 seconds";
}

submitBtn.addEventListener('click', function() {
    if (quoteInput.value.trim() === quoteDisplay.textContent) {
        stopTimer();
        result.textContent = `You typed ${startTime} seconds`;
    } else {
        result.textContent = "You typed incorrect answer";
    }
});
resetBtn.addEventListener('click', function() {
    resetTimer();
    result.textContent = "";
    getRandomQuote();
});
window.addEventListener('load', getRandomQuote);