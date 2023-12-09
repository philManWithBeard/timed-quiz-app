// Start button

//      Event Listener
const startButtonEl = document.querySelector("#start");

startButtonEl.addEventListener("click", () => {
  console.log(`Start Button Pressed`);
  startQuiz();
  timer();
});

// Timer

//      Select DOM Element

const timerEl = document.querySelector("#time");

//      Set Count Interval

const timer = () => {
  let seconds = 0;

  // Sets interval in variable
  var timerInterval = setInterval(function () {
    seconds++;
    console.log(seconds);
    timerEl.textContent = seconds;
  }, 1000);
};

// Quiz

const startQuiz = () => console.log(`Start Quiz`);

//      Remove Start Elements

//      Present question

//      Present answers

//      Present correct or incorrect status

// State

//      Hold state Question

//      Hold state answer status

//      Store state in localstorage

//      Hold username

//      Hold total score
