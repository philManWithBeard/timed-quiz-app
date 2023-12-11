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
    newButton.setAttribute("class", "choiceButton");
    choicesEl.appendChild(newButton);
  });
};

// Choice Buttons
const choicesCheck = (event) => {
  event.preventDefault();
  event.stopPropagation();
  let correct = new Audio("../assets/sfx/correct.wav");
  let wrong = new Audio("../assets/sfx/incorrect.wav");
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

//      Store state in localstorage

const storeScore = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const storedUserScore = localStorage.getItem("userScore");

  const userScore = {
    initials: initialsEl.value.trim(),
    score: seconds,
  };

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

/* handler for set data  */
let setData = (item) => {
  if (getData(item) != false) {
    alert("Score already added");
  } else {
    let data = getData(); // call getdata handler for getting  data from list
    data = data != false ? data : [];
    data.push(item);
    data = JSON.stringify(data);
    /*
     * localStorage.setItem(<itemname>,<itemvalue>) main method
     * (predefined method of js) for set item into localstorage
     */
    localStorage.setItem("userScore", data);
  }
};

/* handler for get data  */
let getData = (item = null) => {
  /*
   * localStorage.getItem(<itemname>) main method
   * (predefined method of js) for getting item from localstorage
   */
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
