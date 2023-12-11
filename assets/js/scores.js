// Start Button
const highScoresEl = document.querySelector("#highscores");

const userScore = JSON.parse(localStorage.getItem("userScore"));

const sortedUserScore = userScore.sort((a, b) => {
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
