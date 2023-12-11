/*--- Selectors ---*/

// High Scores
const highScoresEl = document.querySelector("#highscores");

// Clear Button
const clearButtonEl = document.querySelector("#clear");

/*--- Display High Scores ---*/

// Set userScore global variable
const userScore = JSON.parse(localStorage.getItem("userScore"));

// If userScores exist then sort and display them
if (userScore !== null) {
  userScore.sort((a, b) => {
    let x = a.score;
    let y = b.score;
    if (y > x) {
      return 1;
    }
    if (y < x) {
      return -1;
    }
    return 0;
  });
  userScore.forEach((element) => {
    const userScoreLi = document.createElement("li");
    highScoresEl.appendChild(userScoreLi);
    userScoreLi.textContent = element.initials + " - " + element.score;
  });
}

/*--- Event Listeners ---*/

// Clear Button
clearButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  localStorage.clear("userScore"); // clear localstorage

  while (highScoresEl.firstChild) {
    highScoresEl.removeChild(highScoresEl.firstChild); // remove scores from screen
  }
});
