// Selectors
const startBtn = document.querySelector('[start]');
const pauseBtn = document.querySelector('[pause]');
const pomodoroBtn = document.querySelector('[pomodoro]');
const shortBreakBtn = document.querySelector('[short-break]');
const longBreakBtn = document.querySelector('[long-break]');
const configBtn = document.querySelector('[config]')
const timer = document.querySelector('[timer]');
const progressBar = document.querySelector('[progress-bar]');
const quoteBox = document.querySelector('[quote-box]');

// Global Variables
let active = false;
let pomodoroTime = 1500; // 25min
let shortBreakTime = 300; // 5min
let longBreakTime = 1500; // 25min
let remainMinutes = 0;
let remainSeconds = 0;
let fullTime = pomodoroTime;
let remainTime = fullTime;

// Event Listeners
startBtn.addEventListener('click', () => {
    console.log('Start button clicked');
    startBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
    start();
});
pauseBtn.addEventListener('click', () => {
    console.log('Pause button clicked');
    pauseBtn.classList.add('hide');
    startBtn.classList.remove('hide');
    pause();
});
pomodoroBtn.addEventListener('click', () => {
    console.log('Pomodoro button clicked');
    pause();
    pauseBtn.classList.add('hide');
    startBtn.classList.remove('hide');
    fullTime = pomodoroTime;
    remainTime = fullTime;
});
shortBreakBtn.addEventListener('click', () => {
    console.log('Short break button clicked');
    pause();
    pauseBtn.classList.add('hide');
    startBtn.classList.remove('hide');
    fullTime = shortBreakTime;
    remainTime = fullTime;
});
longBreakBtn.addEventListener('click', () => {
    console.log('Long break button clicked');
    pause();
    pauseBtn.classList.add('hide');
    startBtn.classList.remove('hide');
    fullTime = longBreakTime;
    remainTime = fullTime;
});
configBtn.addEventListener('click', () => {
    pomodoroTime = parseInt(prompt('Pomodoro duration (in minutes)')) * 60
    shortBreakTime = parseInt(prompt('Short break duration (in minutes)')) * 60
    longBreakTime = parseInt(prompt('Long break duration (in minutes)')) * 60
})
// Functions
function start() {
    active = true;
}

function pause() {
    active = false;
}

function updateTimer() {
    if (remainTime > 0) {
        if (active) {
            remainTime--;
        }
        remainMinutes = Math.floor(remainTime / 60);
        remainSeconds = remainTime % 60;
        if (remainMinutes < 10) {
            var remainMinutesTxt = `0${remainMinutes}`;
        } else {
            var remainMinutesTxt = `${remainMinutes}`;
        }
        if (remainSeconds < 10) {
            var remainSecondsTxt = `0${remainSeconds}`;
        } else {
            var remainSecondsTxt = `${remainSeconds}`;
        }
        timer.innerHTML = `${remainMinutesTxt}:${remainSecondsTxt}`;
        updateBar();
    } else if (remainTime === 0) {
        pause();
        pauseBtn.classList.add('hide');
        startBtn.classList.remove('hide');
        fullTime = shortBreakTime;
        remainTime = fullTime;
    }
}

function updateBar() {
    const remainTimePercentage = (remainTime / fullTime) * 100;
    progressBar instanceof HTMLElement
        ? (progressBar.style.width = `${remainTimePercentage}%`)
        : '';
}

async function changeQuote() {
    const response = await fetch(
        'https://goquotes-api.herokuapp.com/api/v1/random?count=1'
    );
    const data = await response.json();
    quoteBox.innerHTML = `"${await data.quotes[0].text}"<br>${await data
        .quotes[0].author}`;
    console.log(await data);
}
changeQuote();

setInterval(updateTimer, 1);
setInterval(changeQuote, 18000);