// Selectors

//  Start Button
const startButtonEl = document.querySelector("#start");

//  Start Screen
const startScreenEl = document.querySelector("#start-screen");

//  Questions
const questionsEl = document.querySelector("#questions");

// Start button

startButtonEl.addEventListener("click", () => {
  console.log(`Start Button Pressed`);
  startQuiz();
  timer();
});

// Timer

//  Select DOM Element

const timerEl = document.querySelector("#time");

//  Set Count Interval

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

const startQuiz = () => {
  console.log(`Start Quiz`);
  hideStartElements();
  presentQuestionElements();
};

//      Hide Start Elements
const hideStartElements = () => {
  console.log(`Hide start elements`);
  startScreenEl.classList.add("hide");
};

//      Present question

const presentQuestionElements = () => {
  console.log(`Present question elements`);
  questionsEl.classList.remove("hide");
};

//      Present correct or incorrect status

// State

//      Hold state Question

//      Hold state answer status

//      Store state in localstorage

//      Hold username

//      Hold total score
