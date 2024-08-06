// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startButton.innerText = 'Running...';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.innerText = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerText = '00:00:00.000';
    laps.innerHTML = '';
    startButton.innerText = 'Start';
    lapCount = 0;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerText;
        const lapDiv = document.createElement('div');
        lapDiv.innerText = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapDiv);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + '.' + 
        (milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : '') + milliseconds;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
