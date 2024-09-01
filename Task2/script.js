let timerInterval;
let isRunning = false;
let startTime, updatedTime, difference;
let savedTime = 0;
let minutes = 0, seconds = 0, milliseconds = 0;

const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const clearLapsBtn = document.getElementById('clear-laps');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime + savedTime;

    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    milliseconds = Math.floor((difference % 1000) / 10);

    minutesSpan.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsSpan.textContent = seconds < 10 ? "0" + seconds : seconds;
    millisecondsSpan.textContent = milliseconds < 10 ? "0" + milliseconds : milliseconds;
}

startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 10);
    } else {
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        clearInterval(timerInterval);
        savedTime += updatedTime - startTime;
    }
});

resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    savedTime = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
    millisecondsSpan.textContent = "00";
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = `${minutesSpan.textContent}:${secondsSpan.textContent}:${millisecondsSpan.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
});

clearLapsBtn.addEventListener('click', () => {
    lapsContainer.innerHTML = '';
});
