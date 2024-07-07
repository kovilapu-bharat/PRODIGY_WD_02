let startTime, updatedTime, difference, tInterval, running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10); // Update every 10ms for better accuracy
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.textContent = "00:00:00:00";
    lapsContainer.innerHTML = '';
    lapCounter = 1;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10); // Get two digits of milliseconds
    display.textContent = 
        `${hours < 10 ? "0" : ""}${hours}:` +
        `${minutes < 10 ? "0" : ""}${minutes}:` +
        `${seconds < 10 ? "0" : ""}${seconds}:` +
        `${milliseconds < 10 ? "0" : ""}${milliseconds}`;
}

function recordLap() {
    if (running) {
        let li = document.createElement('li');
        li.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
        lapsContainer.appendChild(li);
    }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

display.textContent = "00:00:00:00"; // Initial display
