/*--- Global Variables ---*/

// Question Number
let questionNumber = 0;

// Time
let seconds = 75;

/*--- Selectors ---*/

// Start Button
const startButtonEl = document.querySelector("#start");

// Choice Button
const choiceButtonsEl = document.querySelector(".choice");

// Start Screen
const startScreenEl = document.querySelector("#start-screen");

// Questions
const questionsEl = document.querySelector("#questions");

// Question Title
const questionTitleEl = document.querySelector("#question-title");

// Question Choices
const choicesEl = document.querySelector("#choices");

// Timer
const timerEl = document.querySelector("#time");

// Final Score
const finalScoreEl = document.querySelector("#final-score");

// End Screen
const endScreenEl = document.querySelector("#end-screen");

// Feedback
const feedbackEl = document.querySelector("#feedback");

// Submit
const submitEl = document.querySelector("#submit");

// Initials
const initialsEl = document.querySelector("#initials");

/*--- Timer ---*/

const timer = () => {
  timerEl.textContent = seconds;
  // Sets interval in variable
  timerInterval = setInterval(function () {
    seconds--;
    if (seconds === 0) {
      clearInterval(timerInterval);
      console.log("Ding!");
    }
    timerEl.textContent = seconds;
  }, 1000);
};

/*--- Quiz ---*/

const startQuiz = () => {
  toggleStartVisibility();
  toggleQuestionVisibility();
  presentNextQuestion(0);
};

// Toggle Start Visibility
const toggleStartVisibility = () => {
  startScreenEl.classList.add("hide");
};

// Question Visibility
const toggleQuestionVisibility = () => {
  questionsEl.classList.remove("hide");
};

// Clear Choices
const clearChoices = () => {
  while (choicesEl.firstChild) {
    choicesEl.removeChild(choicesEl.firstChild);
  }
};

// Present Question
const presentNextQuestion = () => {
  questionTitleEl.textContent = questions[questionNumber].Question;
  let answerNumber = 0;
  clearChoices();
  questions[questionNumber].Choices.forEach((i) => {
    answerNumber++;
    const newButton = document.createElement("button");
    newButton.textContent = answerNumber + ". " + i;
    newButton.setAttribute("id", answerNumber);
    choicesEl.appendChild(newButton);
  });
};

// Choice Buttons
const choicesCheck = (event) => {
  event.preventDefault();
  event.stopPropagation();
  feedbackEl.classList.remove("hide");
  if (parseInt(event.srcElement.id) !== questions[questionNumber].Correct) {
    seconds -= 10;
    timerEl.textContent = seconds;
    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  questionNumber++;
  questionNumber < questions.length ? presentNextQuestion() : presentScore();
};

/*--- Score Screen ---*/

const presentScore = () => {
  questionsEl.classList.add("hide");
  endScreenEl.classList.remove("hide");
  clearInterval(timerInterval);
  finalScoreEl.textContent = seconds;
};

//      Store state in localstorage

const storeScore = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const userScore = {
    initials: initialsEl.value.trim(),
    score: seconds,
  };

  if (userScore.initials.length > 3) {
    alert("Error: Initials cannot be greater than 3");
  }

  console.log("Storing Score");
  localStorage.setItem("userScore", userScore);
};

//      Hold username

//      Hold total score

/*--- Event Listeners ---*/

//  Start Button
startButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  startQuiz();
  timer();
});

//  Choices Button
choicesEl.addEventListener("click", choicesCheck);

//  Submit Button
submitEl.addEventListener("click", storeScore);
