/*--- Global ---*/

// Question Number
let questionNumber = 0;

// Seconds
let seconds = 75;

// timerInterval
const timer = () => {
  timerEl.textContent = seconds;
  // returns setInterval to global variable
  timerInterval = setInterval(function () {
    seconds--;
    if (seconds === 0) {
      clearInterval(timerInterval);
      alert("You've run out of time");
      presentScore();
    }
    timerEl.textContent = seconds;
  }, 1000);
};

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

/*--- Quiz ---*/

// Call functions to start quiz
const startQuiz = () => {
  toggleStartVisibility();
  toggleQuestionVisibility();
  presentNextQuestion(0);
};

// Hide Start Screen
const toggleStartVisibility = () => {
  startScreenEl.classList.add("hide");
};

// Unhide Question
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
  // Set the question text
  questionTitleEl.textContent = questions[questionNumber].Question;

  // Clear Choices, then iterate over Choices array and display all Choices as buttons
  let answerNumber = 0;
  clearChoices();
  questions[questionNumber].Choices.forEach((i) => {
    answerNumber++;
    const newButton = document.createElement("button");
    newButton.textContent = answerNumber + ". " + i;
    newButton.setAttribute("id", answerNumber);
    newButton.setAttribute("class", "choiceButton");
    choicesEl.appendChild(newButton);
  });
};

// Check Choices
const choicesCheck = (event) => {
  event.preventDefault();
  event.stopPropagation();

  // Variables for audio
  let correct = new Audio("./assets/sfx/correct.wav");
  let wrong = new Audio("./assets/sfx/incorrect.wav");

  // Check if Choice is correct
  if (event.target.classList.contains("choiceButton")) {
    feedbackEl.classList.remove("hide");
    if (parseInt(event.srcElement.id) !== questions[questionNumber].Correct) {
      seconds -= 10;
      timerEl.textContent = seconds;
      feedbackEl.textContent = "Wrong!";
      wrong.play();
    } else {
      feedbackEl.textContent = "Correct!";
      correct.play();
    }

    // Either go to next question or if it's the final question then presen score
    questionNumber++;
    questionNumber < questions.length ? presentNextQuestion() : presentScore();
  }
};

/*--- Score Screen ---*/

const presentScore = () => {
  questionsEl.classList.add("hide");
  endScreenEl.classList.remove("hide");
  clearInterval(timerInterval);
  finalScoreEl.textContent = seconds;
};

// Store score and user initials in localstorage

const storeScore = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const storedUserScore = localStorage.getItem("userScore");

  const userScore = {
    initials: initialsEl.value.trim(),
    score: seconds,
  };

  // validate initials and alert user or set data and go to high score screen
  if (userScore.initials.length > 3) {
    alert("Error: Initials cannot be greater than 3");
  } else if (!userScore.initials.match(/^[A-Za-z]*$/)) {
    alert("Error: Initials can only contain letters");
  } else {
    console.log("Storing Score");

    setData(userScore);
    window.location.href = "./highscores.html";
  }
};

// Handler for set data
let setData = (item) => {
  if (getData(item) != false) {
    alert("Score already added");
  } else {
    let data = getData(); // call getdata handler for getting  data from list
    data = data != false ? data : [];
    data.push(item);
    data = JSON.stringify(data);
    localStorage.setItem("userScore", data);
  }
};

// Handler for get data
let getData = (item = null) => {
  let data = JSON.parse(localStorage.getItem("userScore"));
  if (data) {
    if (item) {
      if (data.indexOf(item) != -1) {
        return data[item];
      } else {
        return false;
      }
    }
    return data;
  }
  return false;
};

/*--- Event Listeners ---*/

// Start Button
startButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  startQuiz();
  timer();
});

// Choices Button
choicesEl.addEventListener("click", choicesCheck);

// Submit Button
submitEl.addEventListener("click", storeScore);
