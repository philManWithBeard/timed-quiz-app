// Selectors

//  Start Button
const startButtonEl = document.querySelector("#start");

//  Choice Button
const choiceButtonsEl = document.querySelector(".choice");

//  Start Screen
const startScreenEl = document.querySelector("#start-screen");

//  Questions
const questionsEl = document.querySelector("#questions");

//  Question Title
const questionTitleEl = document.querySelector("#question-title");

//  Question Choices
const choicesEl = document.querySelector("#choices");

//  Timer
const timerEl = document.querySelector("#time");

// Start button

startButtonEl.addEventListener("click", () => {
  console.log(`Start Button Pressed`);
  startQuiz();
  timer();
});

// Timer

const timer = () => {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      clearInterval(interval);
      console.log("Ding!");
    }
    timerEl.textContent = seconds;
  }, 1000);
};

// Quiz

const startQuiz = () => {
  console.log(`Start Quiz`);
  toggleStartVisibility();
  toggleQuestionVisibility();
  presentNextQuestion(0);
};

//  Toggle Start Visibility
const toggleStartVisibility = () => {
  console.log(`Toggle Start Visibility`);
  startScreenEl.classList.add("hide");
};

//  Toggle Question Visibility
const toggleQuestionVisibility = () => {
  console.log(`Toggle Question Visibility`);
  questionsEl.classList.remove("hide");
};

//  Present Question

const presentNextQuestion = () => {
  console.log(`Present question elements`);
  questionTitleEl.textContent = questions[questionNumber].Question;
  let answerNumber = 0;
  choicesEl.innerHTML = "";
  questions[questionNumber].Choices.forEach((i) => {
    answerNumber++;
    const newButton = document.createElement("button");
    console.log(i);
    newButton.textContent = answerNumber + ". " + i;
    newButton.setAttribute("id", answerNumber);
    choicesEl.appendChild(newButton);
  });
};

//  Choice Buttons

const choicesCheck = (event) => {
  if (parseInt(event.srcElement.id) !== questions[questionNumber].Correct) {
    console.log("is not correct");
    seconds -= 10;
  }

  questionNumber++;
  presentNextQuestion();
};

// State

//  Question Number

let questionNumber = 0;

//  Time

let seconds = 75;

//      Store state in localstorage

//      Hold username

//      Hold total score

choicesEl.addEventListener("click", choicesCheck);
