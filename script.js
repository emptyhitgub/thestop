// Variables
let startTime = 0;
let elapsedTime = 0;
let running = false;
let taskCompleted = false;
let intervalID;
let blind = false;

// Elements
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const centisecondsElement = document.getElementById('centiseconds');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const btnBlind = document.getElementById('btn-blind');

// Functions
function formatTime(time) {
  const minutes = Math.floor(time / 6000).toString().padStart(2, '0');
  const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, '0');
  const centiseconds = (time % 100).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function showTime() {
  if (blind && running) {
    minutesElement.textContent = '--';
    secondsElement.textContent = '--';
    centisecondsElement.textContent = '--';
    return;
  }
  const formattedTime = formatTime(Math.floor(elapsedTime / 10));
  minutesElement.textContent = formattedTime.slice(0, 2);
  secondsElement.textContent = formattedTime.slice(3, 5);
  centisecondsElement.textContent = formattedTime.slice(6);
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  showTime();
}

function toggleBlind() {
  blind = !blind;
  btnBlind.textContent = blind ? 'Blind: On' : 'Blind: Off';
  btnBlind.classList.toggle('on', blind);
  showTime();
}

function startTimer() {
  running = true;
  startTime = Date.now() - elapsedTime;
  intervalID = setInterval(updateTimer, 10);
  btnStart.textContent = 'Stop';
  btnStart.classList.add('stop');
  showTime();
}

function stopTimer() {
  clearInterval(intervalID);
  running = false;
  btnStart.textContent = 'Start';
  btnStart.classList.remove('stop');
  showTime();
}

function toggleTimer() {
  if (running) {
    stopTimer();
  } else {
    startTimer();
  }
}

function restartTimer() {
  stopTimer();
  elapsedTime = 0;
  showTime();
  taskCompleted = false;
}

// Event listeners
btnStart.addEventListener('click', toggleTimer);
btnRestart.addEventListener('click', restartTimer);
btnBlind.addEventListener('click', toggleBlind);

document.addEventListener('keypress', function (event) {
  if (event.code === 'Space') {
    toggleTimer();
  }
  if (event.code === 'KeyR') {
    restartTimer();
  }
});
